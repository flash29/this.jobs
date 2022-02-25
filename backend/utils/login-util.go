package utils

import "golang.org/x/crypto/bcrypt"

func VerifyPassword(password, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func LoginCheck(username string, password string) (string, error) {

	// var err error

	// u := UserLogin{}

	// err = DB.Model(User{}).Where("username = ?", username).Take(&u).Error

	// if err != nil {
	// 	return "", err
	// }

	// err = VerifyPassword(password, u.Password)

	// if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
	// 	return "", err
	// }

	token, err := GenerateToken(1) //todo

	if err != nil {
		return "", err
	}

	return token, nil

}
