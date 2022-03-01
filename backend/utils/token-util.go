package utils

import (
	"strings"
	"time"

	"com.uf/src/models"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var jwtSecretKey = []byte("this.jobs")

// type JwtClaims struct {
// 	username  string
// 	useremail string
// 	userid    int
// 	jwt.StandardClaims
// }

func GenerateToken(user models.User) (string, error) {
	user.Password = ""
	tokenExpirationTime := time.Now().Add(24 * time.Hour)
	// jwtClaim := &JwtClaims{
	// 	username:  user.UserName,
	// 	useremail: user.UserEmail,
	// 	userid:    user.UserID,
	// 	StandardClaims: jwt.StandardClaims{
	// 		ExpiresAt: tokenExpirationTime.Unix(),
	// 		IssuedAt:  time.Now().Unix(),
	// 		Issuer:    "this.jobs",
	// 		Subject:   "Token for this.jobs frontend",
	// 	},
	// }

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

	return token.SignedString(jwtSecretKey) //todo

}

func TokenValid(c *gin.Context) (*jwt.Token, error) {
	// tokenString := ExtractToken(c)
	// claims := &JwtClaims{}

	// token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (i interface{}, err error) {
	// 	return jwtSecretKey, nil
	// })
	// return token, claims, err
	tokenString := ExtractToken(c)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtSecretKey, nil
	})
	return token, err
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
