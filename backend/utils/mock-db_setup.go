package utils

import (
	"com.uf/src/models"
	"github.com/jinzhu/gorm"
)

func MockConnectDatabase() {
	database, err := gorm.Open("sqlite3", "../mockjobs.db")
	database.LogMode(true)
	if err != nil {
		panic("Failed to connect to database!")
	}

	//database.Model(&models.UserPost{}).Related(&models.Comment{})
	database.AutoMigrate(models.UserPost{}, models.Comment{}, models.User{})
	database.Model(&models.Comment{}).AddForeignKey("post_id", "user_posts(id)", "CASCADE", "CASCADE")
	//database.AutoMigrate(models.Comment{})

	DB = database
}