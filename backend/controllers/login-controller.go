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

	u.Username = input.Username
	u.Password = input.Password

	token, err := utils.LoginCheck(u.Username, u.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username or password is incorrect."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})

}
