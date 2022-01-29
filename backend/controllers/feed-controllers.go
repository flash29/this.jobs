package controllers

import (
	"fmt"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func DeletePost(c *gin.Context) {
	id := c.Params.ByName("id")
	var post models.UserPost
	d := utils.DB.Where("post_id = ?", id).Delete(&post)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePost(c *gin.Context) {
	var post models.UserPost
	id := c.Params.ByName("id")
	if err := utils.DB.Where("id = ?", id).First(&post).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&post)
	utils.DB.Save(&post)
	c.JSON(200, post)
}

func CreatePost(c *gin.Context) {
	var post models.UserPost
	c.BindJSON(&post)
	utils.DB.Create(&post)
	c.JSON(200, post)
}

func GetPost(c *gin.Context) {
	id := c.Params.ByName("id")
	var post models.UserPost
	if err := utils.DB.Where("id = ?", id).First(&post).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, post)
	}
}

func GetPosts(c *gin.Context) {
	var people []models.UserPost
	var comments []models.Comment
	if err := utils.DB.Preloads(&comments).Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {

		c.JSON(200, people)
	}
}
