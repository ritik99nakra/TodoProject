package Services

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"todo/pkg/database"
	"todo/pkg/model"
)

func CreateUser(user model.User) (model.User, error) {
	inserted, err := database.DB1.InsertOne(context.Background(), user)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted user in db with id: ", inserted.InsertedID)
	return user, nil
}

func TodoCreate(todo model.TodoList) (model.TodoList, error) {

	inserted, err := database.DB.InsertOne(context.Background(), todo)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted user in db with id: ", inserted.InsertedID)
	return todo, nil
}

func TodoGetByTaskID(taskID string) (model.TodoList, error) {
	var todo model.TodoList
	objectId, err := primitive.ObjectIDFromHex(taskID)
	if err != nil {
		log.Fatal(err)
		return todo, err
	}
	err = database.DB.FindOne(context.Background(), bson.M{"id": objectId}).Decode(&todo)
	if err != nil {
		log.Fatal(err)
		return todo, err
	}
	return todo, err

}

func TodoFindAllByEmail(useremail string) ([]model.TodoList, error) {
	var todos []model.TodoList
	cursor, err := database.DB.Find(context.Background(), bson.M{"email": useremail})
	if err = cursor.All(context.Background(), &todos); err != nil {
		log.Fatal(err)
		return todos, err
	}
	//myDate, _ := time.Parse("2006-01-02", todos)
	//t1 := time.Now().Format("2006-01-02")
	//t2 := myDate.Format("2006-01-02")
	return todos, nil
}

func TodoDeleteById(taskID string) (model.TodoList, error) {
	var todo model.TodoList
	objectId, err := primitive.ObjectIDFromHex(taskID)
	if err != nil {
		log.Fatal(err)
		return todo, err
	}
	deleteCount, err := database.DB.DeleteOne(context.Background(), bson.M{"id": objectId})
	if err != nil {
		log.Fatal(err)
		return todo, err
	}
	fmt.Println("Deleted one task ", deleteCount)
	return todo, err
}

func TodoUpdateById(taskID string, todo model.TodoList) (model.TodoList, error) {
	fmt.Println(taskID)
	objectId, err := primitive.ObjectIDFromHex(taskID)
	if err != nil {
		log.Fatal(err)
		return todo, err
	}
	update := bson.M{"$set": bson.M{"title": todo.Title, "task": todo.Task, "date": todo.Date}}

	result, err := database.DB.UpdateOne(context.Background(), bson.M{"id": objectId}, update)
	if err != nil {
		log.Fatal(err)
		return todo, err
	}
	fmt.Println("modified count", result.ModifiedCount)
	return todo, err
}

func TodoStatusUpdateById(taskID string, todo model.TodoList) (model.TodoList, error) {

	objectId, err := primitive.ObjectIDFromHex(taskID)
	if err != nil {
		log.Fatal(err)
		return todo, err
	}
	//myDate, _ := time.Parse("2006-01-02", todo.Date)
	//t1 := time.Now().Format("2006-01-02")
	//t2 := myDate.Format("2006-01-02")
	if !todo.Status {
		update := bson.M{"$set": bson.M{"status": true}}
		_, err := database.DB.UpdateOne(context.Background(), bson.M{"id": objectId}, update)
		if err != nil {
			log.Fatal(err)
			return todo, err

		}
	} else {
		update := bson.M{"$set": bson.M{"status": false}}
		_, err := database.DB.UpdateOne(context.Background(), bson.M{"id": objectId}, update)
		if err != nil {
			log.Fatal(err)
			return todo, err

		}
	}

	return todo, err
}
