package controllers

import (
	"net/http"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

type SearchResult struct {
	UserID    int    `json:"userId"`
	UserEmail string `json:"useremail" `
	UserName  string `json:"username"`
	Bio       string `json:"bio"`
}

func SearchPeople(c *gin.Context) {
	searchTerm, present := c.GetQuery("search")

	if !present {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Search query not present"})
		return
	}
	var dbRes []models.User
	var searches []SearchResult
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
