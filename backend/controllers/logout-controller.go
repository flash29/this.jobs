package controllers

import (
	"net/http"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func Logout(c *gin.Context) {
	id := c.Params.ByName("id")
	var userToken models.UserToken
	if err := utils.DB.Where("user_id = ?", id).First(&userToken).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user token"})
		return
	}
	d := utils.DB.Where("user_id = ?", id).Delete(&userToken)
	if d.Error != nil {
		c.JSON(404, gin.H{"message:": "Did not find any user token for id: " + id})
	} else {
		c.JSON(200, gin.H{"message:": "deleted token for user with id " + id})
	}
}
