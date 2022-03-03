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
	if err := utils.DB.Preload("EducationList").Preload("ProjectList").Preload("JobHistoryList").Where("user_id = ?", userid).First(&userProfile).Error; err != nil {
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

	if err := utils.DB.Where("user_id = ?", inputUserProfile.UserID).First(&userProfile).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to retrieve user profile"})
	} else {
		userProfile.DisplayPicture = inputUserProfile.DisplayPicture
		utils.DB.Save(&userProfile)
		c.JSON(http.StatusOK, gin.H{"message": "Profile photo uploaded successfully"})
	}
}

func AddEducationDetails(c *gin.Context) {
	var education models.Education
	c.BindJSON(&education)

	var user models.User
	result := utils.DB.Where("user_id = ?", education.UserID).First(&user)

	if result != nil && result.RowsAffected == 1 {
		utils.DB.Create(&education)
		c.JSON(http.StatusCreated, education)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to add education details"})
	}
}

func UpdateEducationDetails(c *gin.Context) {
	var inpEducation models.Education
	c.BindJSON(&inpEducation)

	var education models.Education
	result := utils.DB.Where(" education_id= ?", inpEducation.EducationId).First(&education)

	if result != nil && result.RowsAffected == 1 {
		utils.DB.Save(&inpEducation)
		c.JSON(http.StatusOK, inpEducation)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update education details"})
	}

}
