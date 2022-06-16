package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name"`
	Email    string             `json:"email"`
	Password []byte             `json:"password"`
}
type TodoList struct {
	Id     primitive.ObjectID `json:"id,omitempty"`
	Title  string             `json:"title,omitempty"`
	Task   string             `json:"task,omitempty"`
	Status bool               `json:"status,omitempty"`
	Date   string             `json:"date,omitempty"`
	Email  string             `json:"email,omitempty"`
}
