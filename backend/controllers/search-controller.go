package controllers

import (
	"net/http"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

type PeopleSearchResult struct {
	UserID    int    `json:"userId"`
	UserEmail string `json:"useremail" `
	UserName  string `json:"username"`
	Bio       string `json:"bio"`
}

type JobSearchResult struct {
	UserId       string `json:"userId" `
	UserEmail    string `json:"useremail"`
	UserName     string `json:"username"`
	JobId        int    `json:"jobId"`
	Content      string `json:"content"`
	CreatedAt    int64  `json:"createdAt"`
	ValidTill    int64  `json:"validTill"`
	JobTitle     string `json:"jobtitle"`
	Location     string `json:"location"`
	Organization string `json:"org"`
	Salary       string `json:"salary"`
}

func SearchJobs(c *gin.Context) {
	searchTerm, present := c.GetQuery("search")

	if !present {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Search query not present"})
		return
	}

	var dbRes []models.JobPost
	var searches []JobSearchResult
	likeSearchTerm := "%" + searchTerm + "%"

	selectString := `users.user_id, users.user_email, users.user_name,
					job_posts.job_id, job_posts.content, job_posts.created_at,
					job_posts.valid_till,job_posts.job_title,job_posts.location,
					job_posts.organization, job_posts.salary`

	likeString := `job_posts.content like ? or job_posts.job_title like ? or job_posts.location like ? or 
					job_posts.organization like ?`

	results := utils.
		DB.
		Select(selectString).
		Joins("left join users on job_posts.user_id = users.user_id").
		Where(likeString, likeSearchTerm, likeSearchTerm, likeSearchTerm, likeSearchTerm).
		Group("job_posts.job_id").
		Find(&dbRes).
		Scan(&searches)

	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to retrieve results"})
		return
	}

	c.JSON(http.StatusOK, searches)

}
func SearchPeople(c *gin.Context) {
	searchTerm, present := c.GetQuery("search")

	if !present {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Search query not present"})
		return
	}
	var dbRes []models.User
	var searches []PeopleSearchResult
	likeSearchTerm := "%" + searchTerm + "%"
	selectString := `users.user_id, users.user_email, users.user_name, users.bio`

	likeString := `users.user_email like ? or users.user_name like ? or users.bio like ? or 
                   educations.ins_name like ? or job_histories.company like ? or job_histories.position like ?
                   or projects.proj_name like ? or projects.description like ?`

	results := utils.
		DB.
		Select(selectString).
		Joins("left join educations on educations.user_id = users.user_id").
		Joins("left join job_histories on job_histories.user_id = users.user_id").
		Joins("left join projects on projects.user_id = users.user_id").
		Where(likeString, likeSearchTerm, likeSearchTerm, likeSearchTerm, likeSearchTerm, likeSearchTerm, likeSearchTerm, likeSearchTerm, likeSearchTerm).
		Group("users.user_id").
		Find(&dbRes).
		Scan(&searches)

	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to retrieve results"})
		return
	}

	c.JSON(http.StatusOK, searches)
}
