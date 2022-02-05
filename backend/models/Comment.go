package models

type Comment struct {
	CommentID   int    `gorm:"primary_key" json:"commentId"`
	CommentData string `json:"commentData"`
	CreatedBy   string `json:"createdBy"`
	PostID      uint   `json:"post_id"`
	CreatedAt   int64  `json:"createdAt"`
	UpdatedAt   int64  `json:"updatedAt"`
}
