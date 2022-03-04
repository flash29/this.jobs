package controllers

import (
	"net/http"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {

	var input models.UserLogin

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := models.UserLogin{}

	u.UserEmail = input.UserEmail
	u.Password = input.Password

	result, err, userId := utils.LoginCheck(u.UserEmail, u.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": result})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": result, "userId": userId})

}
