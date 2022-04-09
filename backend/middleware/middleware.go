package middleware

import (
	"net/http"

	"com.uf/src/models"
	"com.uf/src/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, tokenString, err := utils.TokenValid(c)
		var userToken models.UserToken
		userId := (token.Claims.(jwt.MapClaims))["userid"]
		tokenRes := utils.DB.Where("user_id = ?", userId).First(&userToken)
		if err != nil || !token.Valid || tokenRes.Error != nil || userToken.Token != tokenString {
			c.JSON(http.StatusUnauthorized, gin.H{"msg": "Request not authorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}
