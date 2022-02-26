package controllers

import (
	"fmt"
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
	c.BindJSON(&user)
	user.Password = getHash([]byte(user.Password))
	// if err := c.ShouldBindJSON(&user); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	user.CreatedAt = time.Now().Unix()
	utils.DB.Create(&user)
	user.Password = ""
	c.JSON(200, user)

}
