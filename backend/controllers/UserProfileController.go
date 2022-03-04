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

func AddJobDetails(c *gin.Context) {
	var job models.JobHistory
	c.BindJSON(&job)

	var user models.User
	result := utils.DB.Where("user_id = ?", job.UserID).First(&user)

	if result != nil && result.RowsAffected == 1 {
		utils.DB.Create(&job)
		c.JSON(http.StatusCreated, job)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to add job details"})
	}
}

func UpdateJobDetails(c *gin.Context) {
	var inpJob models.JobHistory
	c.BindJSON(&inpJob)

	var job models.JobHistory
	result := utils.DB.Where(" job_history_id= ?", inpJob.JobHistoryId).First(&job)

	if result != nil && result.RowsAffected == 1 {
		utils.DB.Save(&inpJob)
		c.JSON(http.StatusOK, inpJob)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update job details"})
	}
}

func AddProjectDetails(c *gin.Context) {
	var project models.Project
	c.BindJSON(&project)

	var user models.User
	result := utils.DB.Where("user_id = ?", project.UserID).First(&user)

	if result != nil && result.RowsAffected == 1 {
		utils.DB.Create(&project)
		c.JSON(http.StatusCreated, project)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to add project details"})
	}
}

func UpdateProjectDetails(c *gin.Context) {
	var inpProject models.Project
	c.BindJSON(&inpProject)

	var project models.Project
	result := utils.DB.Where(" project_id= ?", inpProject.ProjectId).First(&project)

	if result != nil && result.RowsAffected == 1 {
		utils.DB.Save(&inpProject)
		c.JSON(http.StatusOK, inpProject)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update project details"})
	}
}
