package models

import "github.com/jinzhu/gorm"

type UserPost struct {
	// ID        string    `json:"id,primary_key"`

	gorm.Model
	CreatedBy   string    `json:"createdBy"`
	Content     string    `json:"content"`
	Likes       []string  `json:"likes"`
	Comments    []Comment `gorm:"foreignKey:postId"`
	Attachments []string  `json:"attachemnts"`
	Tag         string    `json:"tag"`
}

type Comment struct {
	gorm.Model
	CommentData string `json:"commentData"`
	CreatedBy   string `json:"createdBy"`
	PostID      uint   `json:"postId"`
}
