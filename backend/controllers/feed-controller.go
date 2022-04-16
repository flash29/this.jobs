package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
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
	if d.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"post with id " + id: "not found"})
	} else {
		c.JSON(http.StatusOK, gin.H{"post with id " + id: "deleted"})
	}
}

func PostComment(c *gin.Context) {
	var comment models.Comment
	c.BindJSON(&comment)
	var post models.UserPost
	result := utils.DB.Where("post_id = ?", comment.PostID).First(&post)

	if result != nil && result.RowsAffected == 1 {
		comment.CreatedAt = time.Now().Unix()
		utils.DB.Create(&comment)
		c.JSON(http.StatusOK, comment)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to add comment"})
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
				c.JSON(http.StatusOK, gin.H{"message": "likes updated"})
			} else {
				fmt.Println("idx true")
				c.JSON(http.StatusBadRequest, gin.H{"error": "You already liked this post"})
			}
		} else {
			idx := contains(post.LikesList, likes.UserID)
			if idx != -1 {
				post.Likes = post.Likes - 1
				post.LikesList = RemoveUserID(post.LikesList, idx)
				utils.DB.Save(&post)
				c.JSON(http.StatusOK, gin.H{"message": "likes updated"})
			} else {
				fmt.Println("idx false")
				c.JSON(http.StatusBadRequest, gin.H{"error": "You cannot dislike this post"})
			}
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update likes"})
	}
}

func UpdatePost(c *gin.Context) {
	var post models.UserPost
	id := c.Params.ByName("id")
	if err := utils.DB.Where("post_id = ?", id).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Unable to update post"})
	} else {
		c.BindJSON(&post)
		post.UpdatedAt = time.Now().Unix()
		utils.DB.Save(&post)
		c.JSON(http.StatusOK, post)
	}
}

func CreatePost(c *gin.Context) {
	var post models.UserPost
	c.BindJSON(&post)
	fmt.Printf("%+v\n", post)
	if post.CreatedBy == "" || post.Content == "" || post.Tag == "" || contains(Tags, post.Tag) == -1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to create post"})
	} else {
		post.CreatedAt = time.Now().Unix()
		utils.DB.Create(&post)
		c.JSON(http.StatusOK, post)
	}
}

func GetPost(c *gin.Context) {
	id := c.Params.ByName("id")
	var post models.UserPost
	if err := utils.DB.Where("post_id = ?", id).First(&post).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(http.StatusOK, post)
	}
}

func GetFollowingPosts(c *gin.Context) {

	userid := c.Params.ByName("id")

	var user models.User

	res := utils.DB.Where("user_id = ?", userid).First(&user)
	if res.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user"})
	}

	var userposts []models.UserPost

	following := user.Following

	var following_str string
	for _, a := range following {
		following_str += strconv.Itoa(int(a)) + ","
	}
	following_str = strings.TrimSuffix(following_str, ",")
	if following_str != "" {
		result := utils.DB.Preload("Comments", func(db *gorm.DB) *gorm.DB {
			db = db.Order("created_at desc")
			return db
		}).Where("creator_id in (" + following_str + ")").Order("CASE WHEN tag = 'Job-Recruitment' THEN 1 ELSE 2 END, created_at desc").Find(&userposts)
		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve feed posts"})
		} else {
			c.JSON(http.StatusOK, userposts)
		}
	} else {
		c.JSON(http.StatusOK, userposts)
	}
}

func GetPosts(c *gin.Context) {
	var userposts []models.UserPost
	result := utils.DB.Preload("Comments", func(db *gorm.DB) *gorm.DB {
		db = db.Order("created_at desc")
		return db
	}).Order("CASE WHEN tag = 'Job-Recruitment' THEN 1 ELSE 2 END, created_at desc").Find(&userposts)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve feed posts"})
	} else {
		c.JSON(http.StatusOK, userposts)
	}
}
