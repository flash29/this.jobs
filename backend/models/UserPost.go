package models

type UserPost struct {
	//gorm.Model
	PostID    int       `gorm:"primary_key" json:"postId"`
	CreatedBy string    `json:"createdBy"`
	Content   string    `json:"content"`
	Likes     int       `json:"likes"`
	Comments  []Comment `gorm:"ForeignKey:PostID" json:"comments"`
	Tag       string    `json:"tag"`
}

type Comment struct {
	//gorm.Model
	CommentID   int    `gorm:"primary_key" json:"commentId"`
	CommentData string `json:"commentData"`
	CreatedBy   string `json:"createdBy"`
	PostID      uint   `json:"post_id"`
}
