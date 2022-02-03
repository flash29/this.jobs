package models

import (
	"github.com/lib/pq"
)

type UserPost struct {
	PostID      int            `gorm:"primary_key" json:"postId"`
	CreatedBy   string         `json:"createdBy"`
	Content     string         `json:"content"`
	Likes       int            `json:"likes"`
	Comments    []Comment      `gorm:"ForeignKey:PostID" json:"comments"`
	Tag         string         `json:"tag"`
	CreatedAt   int64          `json:"createdAt"`
	UpdatedAt   int64          `json:"updatedAt"`
	LikesList   pq.StringArray `gorm:"type:text[]"`
	Attachments string         `gorm:"type:text" json:"attachments"`
}
