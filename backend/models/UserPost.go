package models

type UserPost struct {
	PostID    int       `gorm:"primary_key" json:"postId"`
	CreatedBy string    `json:"createdBy"`
	Content   string    `json:"content"`
	Likes     int       `json:"likes"`
	Comments  []Comment `gorm:"ForeignKey:PostID" json:"comments"`
	Tag       string    `json:"tag"`
	CreatedAt int64     `json:"createdAt"`
	UpdatedAt int64     `json:"updatedAt"`
}

type Comment struct {
	CommentID   int    `gorm:"primary_key" json:"commentId"`
	CommentData string `json:"commentData"`
	CreatedBy   string `json:"createdBy"`
	PostID      uint   `json:"post_id"`
	CreatedAt   int64  `json:"createdAt"`
	UpdatedAt   int64  `json:"updatedAt"`
}
