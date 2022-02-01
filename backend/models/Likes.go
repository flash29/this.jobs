package models

type Likes struct {
	UserID string `json:"user_id"`
	PostID int    `json:"postId"`
	Liked  bool   `json:"liked"`
}
