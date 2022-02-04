package controllers

import (
	"fmt"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

var Tags = []string{"Job-Recruitment", "Knowledge Sharing", "Inspiration", "Others"}

func DeletePost(c *gin.Context) {
	id := c.Params.ByName("id")
	var post models.UserPost
	d := utils.DB.Where("post_id = ?", id).Delete(&post)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func PostComment(c *gin.Context) {
	var comment models.Comment
	c.BindJSON(&comment)
	var post models.UserPost
	result := utils.DB.Where("post_id = ?", comment.PostID).First(&post)

	if result != nil && result.RowsAffected == 1 {
		comment.CreatedAt = time.Now().Unix()
		utils.DB.Create(&comment)
		c.JSON(200, comment)
	} else {
		c.JSON(400, gin.H{"error": "Unable to add comment"})
	}
}

func contains(s []string, str string) int {
	for idx, v := range s {
		if v == str {
			return idx
		}
	}

	return -1
}

func RemoveUserID(s []string, index int) []string {
	return append(s[:index], s[index+1:]...)
}

func UpdateLikes(c *gin.Context) {

	var post models.UserPost
	var likes models.Likes

	c.BindJSON(&likes)

	post_id := likes.PostID

	liked := likes.Liked

	result := utils.DB.Where("post_id = ?", post_id).First(&post)

	if result != nil && result.RowsAffected == 1 {
		if liked {
			if contains(post.LikesList, likes.UserID) == -1 {
				post.LikesList = append(post.LikesList, likes.UserID)
				post.Likes = post.Likes + 1
				utils.DB.Save(&post)
				c.JSON(200, gin.H{"message": "likes updated"})
			} else {
				fmt.Println("idx true")
				c.JSON(400, gin.H{"error": "You already liked this post"})
			}
		} else {
			idx := contains(post.LikesList, likes.UserID)
			if idx != -1 {
				post.Likes = post.Likes - 1
				post.LikesList = RemoveUserID(post.LikesList, idx)
				utils.DB.Save(&post)
				c.JSON(200, gin.H{"message": "likes updated"})
			} else {
				fmt.Println("idx false")
				c.JSON(400, gin.H{"error": "You cannot dislike this post"})
			}
		}
	} else {
		c.JSON(400, gin.H{"error": "Unable to update likes"})
	}
}

func UpdatePost(c *gin.Context) {
	var post models.UserPost
	id := c.Params.ByName("id")
	if err := utils.DB.Where("id = ?", id).First(&post).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&post)
	post.UpdatedAt = time.Now().Unix()
	utils.DB.Save(&post)
	c.JSON(200, post)
}

func CreatePost(c *gin.Context) {
	var post models.UserPost
	c.BindJSON(&post)
	fmt.Printf("%+v\n", post)
	if post.CreatedBy == "" || post.Content == "" || post.Tag == "" || contains(Tags, post.Tag) == -1 {
		c.JSON(400, gin.H{"error": "Unable to create post"})
	} else {
		post.CreatedAt = time.Now().Unix()
		utils.DB.Create(&post)
		c.JSON(200, post)
	}
}

func GetPost(c *gin.Context) {
	id := c.Params.ByName("id")
	var post models.UserPost
	if err := utils.DB.Where("post_id = ?", id).First(&post).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, post)
	}
}

func GetPosts(c *gin.Context) {
	var userposts []models.UserPost
	result := utils.DB.Preload("Comments", func(db *gorm.DB) *gorm.DB {
		db = db.Order("created_at desc")
		return db
	}).Order("CASE WHEN tag = 'Job-Recuritment' THEN 1 ELSE 2 END, created_at desc").Find(&userposts)
	if result.Error != nil {
		c.JSON(400, gin.H{"error": "Unable to retrieve feed posts"})
	} else {
		c.JSON(200, userposts)
	}
}
