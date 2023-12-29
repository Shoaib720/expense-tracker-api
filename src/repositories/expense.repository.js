const AWS = require('aws-sdk');
const uuid = require('uuid');

class ExpenseRepository {

  awsRegion;
  tableName;
  ddb;

  constructor(dynamoDBTableName, awsRegion = 'us-east-1') {
    console.log(dynamoDBTableName)
    this.awsRegion = awsRegion;
    this.tableName = dynamoDBTableName;
    this.ddb = new AWS.DynamoDB.DocumentClient();
  }

  SaveItem = async (item) => {
    item.id = uuid.v4();
    const params = {
      TableName: this.tableName,
      Item: item
    }
    await this.ddb.put(params).promise();
  }

  GetItems = async (pagination) => {
    const {limit, startKey} = pagination;
    const ExclusiveStartKey = {
      id: startKey
    }
    const params = {
      TableName: this.tableName,
      Limit: limit || null,
      ...(startKey ? {ExclusiveStartKey} : {})
    }
    return await this.ddb.scan(params).promise();
  }

  GetItemById = async (itemId) => {
    const params = {
      TableName: this.tableName,
      Key: {
        'id': itemId
      }
    }
    return await this.ddb.get(params).promise();
  }

  UpdateItemById = async (itemId, updatedItem) => {
    const params = {
      TableName: this.tableName,
      Item: {
        id: itemId,
        ...updatedItem
      }
    }
    await this.ddb.put(params).promise();
  }

  DeleteItemById = async (itemId) => {
    const params = {
      TableName: this.tableName,
      Key: {
        id: itemId
      }
    }
    await this.ddb.delete(params).promise();
  }

}

module.exports = {
  ExpenseRepository
}