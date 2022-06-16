package database

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
)

const connectionString = "mongodb://localhost:27017"
const dbName = "todoproject"
const colName = "TodoList"
const colName1 = "User"

var DB *mongo.Collection
var DB1 *mongo.Collection

func Connect() {
	//client option
	clientOption := options.Client().ApplyURI(connectionString)

	//connect to mongodb
	client, err := mongo.Connect(context.TODO(), clientOption)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("MongoDB connection success")

	DB = client.Database(dbName).Collection(colName)
	DB1 = client.Database(dbName).Collection(colName1)
	//collection instance
	fmt.Println("Collection instance is ready")

}
