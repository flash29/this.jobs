package controllers

import (
	"net/http"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func SearchPeople(c *gin.Context) {
	searchTerm, present := c.GetQuery("search")

	if !present {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Search query not present"})
		return
	}
	var searchRes []models.User
	likeSearchTerm := "%" + searchTerm + "%"
	results := utils.
		DB.Select("user_id, user_email,user_name,display_picture,bio").
		Find(&searchRes, "user_email like ? or user_name like ? or bio like ?", likeSearchTerm, likeSearchTerm, likeSearchTerm)

	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to retrieve results"})
		return
	}

	c.JSON(http.StatusOK, searchRes)
}
