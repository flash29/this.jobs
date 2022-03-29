package controllers

import (
	"fmt"
	"net/http"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func CreateJobPost(c *gin.Context) {
	var post models.JobPost
	c.BindJSON(&post)
	fmt.Printf("%+v\n", post)
	if post.CreatedBy == "" || post.Content == "" {
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
	c.BindJSON(&jobapp)
	var post models.JobPost
	result := utils.DB.Where("job_id = ?", jobapp.JobID).First(&post)

	if result != nil && result.RowsAffected == 1 {
		jobapp.CreatedAt = time.Now().Unix()
		utils.DB.Create(&jobapp)
		c.JSON(200, jobapp)
	} else {
		c.JSON(400, gin.H{"error": "Unable to apply, please try again."})
	}
}
