package utils

import (
	"com.uf/src/models"
	"golang.org/x/crypto/bcrypt"
)

func VerifyPassword(password, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func LoginCheck(useremail string, password string) (string, error, int, string) {

	var err error

	var user models.User

	if err := DB.Where("user_email = ?", useremail).First(&user).Error; err != nil {
		return "User not found", err, -1, "User not found"
	} else {
		err = VerifyPassword(password, user.Password)
		if err != nil {
			return "Password did not match", err, -1, "User not found"
		}
	}

	token, err := GenerateToken(user)

	if err != nil {
		return "Error generating token", err, -1, "User not found"
	}

	userToken := new(models.UserToken)
	userToken.UserId = user.UserID
	userToken.Token = token
	DB.Where("user_id = ?", user.UserID).Delete(&models.UserToken{})
	DB.Create(&userToken)
	return token, nil, user.UserID, user.UserName

}
