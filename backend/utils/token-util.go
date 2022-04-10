package utils

import (
	"strings"
	"time"

	"com.uf/src/models"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var JwtSecretKey = []byte("this.jobs")

func GenerateToken(user models.User) (string, error) {
	user.Password = ""
	tokenExpirationTime := time.Now().Add(24 * time.Hour)
	claim := jwt.MapClaims{}
	claim["authorized"] = true
	claim["username"] = user.UserName
	claim["useremail"] = user.UserEmail
	claim["userid"] = user.UserID
	claim["ExpiresAt"] = tokenExpirationTime.Unix()
	claim["IssuedAt"] = time.Now().Unix()
	claim["Issuer"] = "this.jobs"
	claim["Subject"] = "Token for this.jobs frontend"

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)

	return token.SignedString(JwtSecretKey) //todo

}

func TokenValid(c *gin.Context) (*jwt.Token, string, error) {
	tokenString := ExtractToken(c)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return JwtSecretKey, nil
	})
	return token, tokenString, err
}

func ExtractToken(c *gin.Context) string {
	token := c.Query("token")
	if token != "" {
		return token
	}
	bearerToken := c.Request.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}
