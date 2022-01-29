package utils

import (
	"com.uf/src/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open("sqlite3", "jobs.db")

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(models.UserPost{}, models.Comment{})
	database.Model(&models.Comment{}).AddForeignKey("postId", "userposts(id)", "CASCADE", "RESTRICT")

	DB = database
}
