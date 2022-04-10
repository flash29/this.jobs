package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func isUserPresent(user_id int) (result bool) {
	var userProfile models.User
	Result := utils.DB.Where("user_id = ?", user_id).First(&userProfile)
	return Result.Error == nil
}

func isJobPostPresent(job_id int) (result bool) {
	var post models.JobPost
	Result := utils.DB.Where("job_id = ?", job_id).First(&post)
	return Result.Error == nil
}

func isAlreadyApplied(user_id int, job_id int) (result bool) {
	var application models.JobApplication
	Result := utils.DB.Where("job_id=? and user_id=?", job_id, user_id).Find(&application)
	fmt.Print(Result.Error == nil)
	return Result.Error == nil
}

func RetrieveApplicationsForJobPosting(c *gin.Context) {
	var jobapplications []models.JobApplication
	jobid, _ := strconv.Atoi(c.Params.ByName("jobid"))
	userid, _ := strconv.Atoi(c.Params.ByName("userid"))

	if !isUserPresent(userid) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}

	if !isJobPostPresent(jobid) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrueve the job application"})
		return
	}

	result := utils.DB.Where("user_id=?", userid).Where("job_id=?", jobid).Find(jobapplications)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve job applications"})
	} else {
		c.JSON(http.StatusOK, jobapplications)
	}
}

func RetrieveAllJobPostsById(c *gin.Context) {
	var jobposts []models.JobPost
	id, _ := strconv.Atoi(c.Params.ByName("id"))
	if !isUserPresent(id) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}

	result := utils.DB.Preload("AppliedUsersList", func(db *gorm.DB) *gorm.DB {
		db = db.Order("created_at asc")
		return db
	}).Order("created_at desc").Where("user_id=?", id).Find(&jobposts)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve job posts"})
	} else {
		c.JSON(http.StatusOK, jobposts)
	}
}

func RetrieveAllJobPosts(c *gin.Context) {
	var jobposts []models.JobPost
	result := utils.DB.Preload("AppliedUsersList", func(db *gorm.DB) *gorm.DB {
		db = db.Order("created_at asc")
		return db
	}).Order("created_at desc").Find(&jobposts)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve job posts"})
	} else {
		c.JSON(http.StatusOK, jobposts)
	}
}

func RetrieveAppliedJobsById(c *gin.Context) {
	var jobposts []models.JobPost
	id, _ := strconv.Atoi(c.Params.ByName("id"))
	if !isUserPresent(id) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}

	result := utils.DB.Where("job_id IN (select job_id from job_applications where user_id = ?)", id).Order("created_at desc").Find(&jobposts)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve job posts"})
	} else {
		c.JSON(http.StatusOK, jobposts)
	}
}

func CreateJobPost(c *gin.Context) {
	var post models.JobPost
	c.BindJSON(&post)

	if !isUserPresent(post.UserID) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}

	if post.Content == "" || post.Location == "" || post.JobTitle == "" || post.Organization == "" || post.Salary == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to create job"})
	} else {
		post.CreatedAt = time.Now().Unix()
		utils.DB.Create(&post)
		c.JSON(http.StatusOK, post)
	}
}

func UpdateJobPost(c *gin.Context) {
	var post models.JobPost
	id, _ := strconv.Atoi(c.Params.ByName("id"))

	var job models.JobPost
	result := utils.DB.Where(" job_id= ?", id).First(&job)

	if result != nil && result.RowsAffected == 1 {
		post.JobID = id
		post.UserID = job.UserID
		c.BindJSON(&post)
		post.UpdatedAt = time.Now().Unix()
		utils.DB.Save(&post)
		c.JSON(http.StatusOK, post)
	} else {
		c.JSON(http.StatusNotFound, gin.H{"message:": "Did not find any job with id " + strconv.Itoa(id)})
	}
}

func DeleteJobPost(c *gin.Context) {
	id := c.Params.ByName("id")
	var post models.JobPost
	d := utils.DB.Where("job_id = ?", id).Delete(&post)
	if d.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"message:": "Did not find any job with id " + id})
	} else {
		c.JSON(http.StatusOK, gin.H{"message:": "deleted job with id " + id})
	}
}

func ApplyToJob(c *gin.Context) {
	var jobapp models.JobApplication

	c.BindJSON(&jobapp)
	//needed the username so replaced UserPresent function with the DB call
	var userProfile models.User
	Result := utils.DB.Where("user_id = ?", jobapp.UserID).First(&userProfile)
	if Result == nil || Result.RowsAffected != 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}
	var post models.JobPost

	result := utils.DB.Where("job_id = ?", jobapp.JobID).First(&post)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve the Job post"})
		return
	}

	if post.UserID == jobapp.UserID {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to apply"})
		return
	}

	if post.ValidTill < time.Now().Unix() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sorry, no longer accepting applications for this job"})
		return
	}

	if isAlreadyApplied(jobapp.UserID, int(jobapp.JobID)) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You have already applied for this Job"})
		return
	}

	if result != nil && result.RowsAffected == 1 {
		jobapp.CreatedAt = time.Now().Unix()
		jobapp.UserName = userProfile.UserName
		utils.DB.Create(&jobapp)
		c.JSON(http.StatusOK, jobapp)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to apply, please try again."})
	}
}
