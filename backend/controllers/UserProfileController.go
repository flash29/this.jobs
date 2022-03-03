package controllers

import (
	"net/http"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func GetUserProfile(c *gin.Context) {
	var userProfile models.User
	userid := c.Params.ByName("id")
	if err := utils.DB.Where("user_id = ?", userid).First(&userProfile).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Unable to retrieve user profile"})
	} else {
		userProfile.Password = ""
		c.JSON(http.StatusOK, userProfile)
	}
}

func UpdateProfilePic(c *gin.Context) {
	var inputUserProfile models.User
	c.BindJSON(&inputUserProfile)

	var userProfile models.User

	if err := utils.DB.Where("user_id = ?", userProfile.UserID).First(&userProfile).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user profile"})
	} else {
		userProfile.DisplayPicture = inputUserProfile.DisplayPicture
		utils.DB.Save(&userProfile)
		c.JSON(http.StatusOK, gin.H{"message": "Profile photo uploaded successfully"})
	}
}

func AddEducationDetails(c *gin.Context) {

}

func UpdateEducationDetails(c *gin.Context) {

}
