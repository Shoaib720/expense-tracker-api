const { ExpenseRepository } = require('../repositories/expense.repository');
const { BadRequestError } = require('../utils/error.js');
const { DDB_EXPENSES_TABLE_NAME, AWS_REGION } = require('../config/index')

class ExpenseService {

    constructor() {
        this.repository = new ExpenseRepository(DDB_EXPENSES_TABLE_NAME, AWS_REGION);
    }

    async AddExpense (expenseData) {
        if(!expenseData){
            throw new BadRequestError('Request missing product data!')
        }
        const { category_id, payment_mode_id, amount, description } = expenseData;
        if(!category_id || !payment_mode_id || !amount){
            throw new BadRequestError('Required fields in expense data missing!');
        }
        await this.repository.SaveItem({
            category_id,
            payment_mode_id,
            amount,
            description,
            created_at: new Date().toISOString()
        });
    }

    async GetExpenses (pagination) {
        const {Items, LastEvaluatedKey} = await this.repository.GetItems(pagination);
        return {Items, LastEvaluatedKey}
    }

    async GetExpenseById (itemId) {
        if(!itemId){
            throw new BadRequestError('Request is missing Expense ID!');
        }
        const {Item} = await this.repository.GetItemById(itemId);
        return {Item}
    }

    async UpdateExpense(expenseData){
        if(!expenseData){
            throw new BadRequestError('Request missing Expense data!')
        }
        const { category_id, payment_mode_id, amount, description, created_at } = expenseData;
        if(!category_id || !payment_mode_id || !amount || !created_at){
            throw new BadRequestError('Required fields in expense data missing!');
        }
        await this.repository.UpdateItemById(expenseData.id, expenseData);
    }

    async DeleteExpense(itemId){
        if(!itemId){
            throw new BadRequestError('Request is missing Expense ID!');
        }
        await this.repository.DeleteItemById(itemId);
    }

}

module.exports = {
    ExpenseService
}