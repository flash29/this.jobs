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
		c.JSON(400, gin.H{"error": "Unable to create post"})
	} else {
		post.CreatedAt = time.Now().Unix()
		utils.DB.Create(&post)
		c.JSON(200, post)
	}
}

func UpdateJobPost(c *gin.Context) {
	var post models.JobPost
	id := c.Params.ByName("id")
	if err := utils.DB.Where("post_id = ?", id).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Unable to update post"})
	} else {
		c.BindJSON(&post)
		post.UpdatedAt = time.Now().Unix()
		utils.DB.Save(&post)
		c.JSON(200, post)
	}
}
