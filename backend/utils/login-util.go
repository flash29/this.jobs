package utils

import (
	"fmt"

	"com.uf/src/models"
	"golang.org/x/crypto/bcrypt"
)

func VerifyPassword(password, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func LoginCheck(useremail string, password string) (string, error, int) {

	var err error

	var user models.User

	if err := DB.Where("user_email = ?", useremail).First(&user).Error; err != nil {
		return "User not found", err, -1
	} else {
		fmt.Println("verifying password " + password + " " + user.Password)
		err = VerifyPassword(password, user.Password)
		if err != nil {
			return "Password did not match", err, -1
		}
	}

	// if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
	// 	return "", err
	// }

	token, err := GenerateToken(user) //todo

	if err != nil {
		return "Error generating token", err, -1
	}

	return token, nil, user.UserID

}
