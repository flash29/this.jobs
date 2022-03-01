package controllers

import (
	"fmt"
	"net/http"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func getHash(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		fmt.Println(err)
	}
	return string(hash)
}

func UserRegistration(c *gin.Context) {

	var user models.User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to bind user"})
		return
	}

	UserEmail := user.UserEmail
	Password := user.Password

	if isUserExist(UserEmail) || UserEmail == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User already exists"})
		return
	}

	user.Password = getHash([]byte(Password))
	user.CreatedAt = time.Now().Unix()

	utils.DB.Create(&user)

	user.Password = ""

	c.JSON(http.StatusAccepted, user)

}

func isUserExist(UserEmail string) bool {
	var user models.User
	err := utils.DB.Where("user_email = ?", UserEmail).First(&user).Error
	return err == nil
}
