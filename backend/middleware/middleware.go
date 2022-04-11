package middleware

import (
	"fmt"
	"net/http"
	"reflect"
	"time"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func AbortFlow(c *gin.Context) {
	c.JSON(http.StatusUnauthorized, gin.H{"msg": "Request not authorized"})
	c.Abort()
}
func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, tokenString, err := utils.TokenValid(c)
		if err != nil || !token.Valid {
			AbortFlow(c)
			return
		}

		var userToken models.UserToken
		userId := (token.Claims.(jwt.MapClaims))["userid"]
		tokenRes := utils.DB.Where("user_id = ?", userId).First(&userToken)
		if tokenRes.Error != nil || userToken.Token != tokenString {
			c.JSON(http.StatusUnauthorized, gin.H{"msg": "Request not authorized"})
			AbortFlow(c)
			return
		}
		expTime := (token.Claims.(jwt.MapClaims))["ExpiresAt"].(float64)
		fmt.Println(reflect.TypeOf(expTime))
		if (int64)(expTime) < time.Now().Local().Unix() {
			AbortFlow(c)
			return
		}
		c.Next()
	}
}
