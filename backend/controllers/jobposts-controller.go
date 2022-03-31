package controllers

import (
	"fmt"
	"net/http"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func RetrieveAllJobPostsById(c *gin.Context) {
	var jobposts []models.JobPost
	id := c.Params.ByName("id")
	var userProfile models.User
	if err := utils.DB.Where("user_id = ?", id).First(&userProfile).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}
	result := utils.DB.Preload("AppliedUsersList", func(db *gorm.DB) *gorm.DB {
		db = db.Order("created_at asc")
		return db
	}).Order("created_at desc").Where("user_id=?", id).Find(&jobposts)
	if result.Error != nil {
		c.JSON(400, gin.H{"error": "Unable to retrieve job posts"})
	} else {
		c.JSON(200, jobposts)
	}
}

func RetrieveAllJobPosts(c *gin.Context) {
	var jobposts []models.JobPost
	result := utils.DB.Preload("AppliedUsersList", func(db *gorm.DB) *gorm.DB {
		db = db.Order("created_at asc")
		return db
	}).Order("created_at desc").Find(&jobposts)
	if result.Error != nil {
		c.JSON(400, gin.H{"error": "Unable to retrieve job posts"})
	} else {
		c.JSON(200, jobposts)
	}
}

func RetrieveAppliedJobsById(c *gin.Context) {
	var jobposts []models.JobPost
	id := c.Params.ByName("id")
	var userProfile models.User
	if err := utils.DB.Where("user_id = ?", id).First(&userProfile).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}
	// var jobApp models.JobApplication
	// query := utils.DB.Select("job_id").Where("user_id = ?", id)
	result := utils.DB.Preload("AppliedUsersList", func(db *gorm.DB) *gorm.DB {
		// db = db.Order("created_at asc")
		return db
	}).Where("job_id IN (select job_id from job_applications where user_id = ?)", id).Order("created_at desc").Find(&jobposts)
	fmt.Println(result.Error)
	if result.Error != nil {
		c.JSON(400, gin.H{"error": "Unable to retrieve job posts"})
	} else {
		c.JSON(200, jobposts)
	}
}

func CreateJobPost(c *gin.Context) {
	var post models.JobPost
	c.BindJSON(&post)

	var userProfile models.User

	if err := utils.DB.Where("user_id = ?", post.UserID).First(&userProfile).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}

	if post.Content == "" {
		c.JSON(400, gin.H{"error": "Unable to create job"})
	} else {
		post.CreatedAt = time.Now().Unix()
		utils.DB.Create(&post)
		c.JSON(200, post)
	}
}

func UpdateJobPost(c *gin.Context) {
	var post models.JobPost
	id := c.Params.ByName("id")
	if err := utils.DB.Where("job_id = ?", id).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Unable to update job"})
	} else {
		c.BindJSON(&post)
		post.UpdatedAt = time.Now().Unix()
		utils.DB.Save(&post)
		c.JSON(200, post)
	}
}

func DeleteJobPost(c *gin.Context) {
	id := c.Params.ByName("id")
	var post models.JobPost
	d := utils.DB.Where("job_id = ?", id).Delete(&post)
	if d.Error != nil {
		c.JSON(404, gin.H{"message:": "Did not find any job with id " + id})
	} else {
		c.JSON(200, gin.H{"message:": "deleted job with id " + id})
	}
}

func ApplyToJob(c *gin.Context) {
	var jobapp models.JobApplication
	var userProfile models.User
	c.BindJSON(&jobapp)
	if err := utils.DB.Where("user_id = ?", jobapp.UserID).First(&userProfile).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
		return
	}
	var post models.JobPost
	result := utils.DB.Where("job_id = ?", jobapp.JobID).First(&post)
	if post.UserID == jobapp.UserID {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to apply"})
		return
	}

	if post.ValidTill < time.Now().Unix() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sorry, no longer accepting applications for this job"})
		return
	}
	if result != nil && result.RowsAffected == 1 {
		jobapp.CreatedAt = time.Now().Unix()
		utils.DB.Create(&jobapp)
		c.JSON(200, jobapp)
	} else {
		c.JSON(400, gin.H{"error": "Unable to apply, please try again."})
	}
}
