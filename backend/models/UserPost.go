package models

import "github.com/jinzhu/gorm"

type UserPost struct {
	// ID        string    `json:"id,primary_key"`

	gorm.Model
	CreatedBy   string    `json:"createdBy"`
	Content     string    `json:"content"`
	Likes       []string  `json:"likes"`
	Comments    []Comment `json:"comments"`
	Attachments []string  `json:"attachemnts"`
}

type Comment struct {
	gorm.Model
	CommentData string `json:"commentData"`
	CreatedBy   string `json:"createdBy"`
	PostID      string `json:"postId"`
}
