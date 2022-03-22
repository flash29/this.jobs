package utils

import (
	"com.uf/src/models"
	"github.com/jinzhu/gorm"
)

func MockConnectDatabase() {
	database, err := gorm.Open("sqlite3", "../mockjobs.db")
	database.LogMode(false)
	if err != nil {
		panic("Failed to connect to database!")
	}

	//database.Model(&models.UserPost{}).Related(&models.Comment{})
	database.AutoMigrate(models.User{}, models.Education{}, models.JobHistory{}, models.Project{},
		models.UserPost{}, models.Comment{}, models.JobPost{})
	database.Model(&models.Comment{}).AddForeignKey("post_id", "user_posts(id)", "CASCADE", "CASCADE")
	database.Model(&models.Education{}).AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
	database.Model(&models.Project{}).AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
	database.Model(&models.JobHistory{}).AddForeignKey("user_id", "users(id)", "CASCADE", "CASCADE")
	//database.AutoMigrate(models.Comment{})

	DB = database
}
