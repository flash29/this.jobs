package models

type UserPost struct {
	ID        string  `json:"id"`
	CreatedBy string  `json:"createdBy"`
	Content   string  `json:"content"`
	Likes     float64 `json:"likes"`
}
