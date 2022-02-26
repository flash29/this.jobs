package utils

import (
	"com.uf/src/models"
	"golang.org/x/crypto/bcrypt"

	"fmt"
)

func VerifyPassword(password, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func LoginCheck(username string, password string) (string, error) {

	var err error

	//var u models.UserLogin{}

	//err = DB.Model(User{}).Where("username = ?", username).Take(&u).Error

	if err != nil {
		return "", err
	}

	var user models.User

	if err := DB.Where("user_email = ?", username).First(&user).Error; err != nil {
		//c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println("verifying password " + password + " " + user.Password)
		err = VerifyPassword(password, user.Password)
		if err != nil {
			fmt.Println("err: " + err.Error())
		}
	}

	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", err
	}

	token, err := GenerateToken(1) //todo

	if err != nil {
		return "", err
	}

	return token, nil

}
