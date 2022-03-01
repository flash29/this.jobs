package middleware

import (
	"net/http"

	"com.uf/src/utils"
	"github.com/gin-gonic/gin"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := utils.TokenValid(c)
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"msg": "Request not authorized"})
			c.Abort()
			return
		}
		//claims.user
		//var user models.User
		//utils.DB.First(&user)

		c.Next()
	}
}
