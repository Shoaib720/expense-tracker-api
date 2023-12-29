const { ExpenseService } = require('../services/expense.service');
// const { Logger } = require('../utils/logger');
const { sendAPIResponse } = require('../utils/api-responses');
const { StatusCodes } = require('../utils/status-code.js')

const ExpenseAPI = async (app) => {

    const expenseService = new ExpenseService();

    app.post('/api/v1/expenses', async (req, res, next) => {
        try{
            const productData = {
                category_id: req.body.category_id,
                payment_mode_id: req.body.payment_mode_id,
                amount: req.body.amount,
                description: req.body.description || null
            }
            await expenseService.AddExpense(productData);
            sendAPIResponse(res, StatusCodes.CREATED);
        }
        catch(err) {
            next(err);
        }
    });

    app.get('/api/v1/expenses', async (req, res, next) => {
        try{
            if(req.query.id){
                const {Item} = await expenseService.GetExpenseById(req.query.id);
                const Items = [];
                if (Item)
                    Items.push(Item)
                sendAPIResponse(res, StatusCodes.OK, {data: Items, lastEvaluatedKey: null});
            }
            else{
                const {limit, startKey} = req.query;
                const {Items, LastEvaluatedKey} = await expenseService.GetExpenses({limit, startKey});
                sendAPIResponse(res, StatusCodes.OK, {data: Items, lastEvaluatedKey: LastEvaluatedKey || null});
            }
        }
        catch(err){
            next(err);
        }
    });

    app.put('/api/v1/expenses', async (req, res, next) => {
        try{
            const {Item} = await expenseService.GetExpenseById(req.query.id);
            const data = {
                id: req.query.id,
                category_id: req.body.category_id,
                payment_mode_id: req.body.payment_mode_id,
                amount: req.body.amount,
                description: req.body.description || null,
                created_at: Item.created_at
            }
            await expenseService.UpdateExpense(data);
            sendAPIResponse(res, StatusCodes.OK);
        }
        catch(err){
            next(err);
        }
    })

    app.delete('/api/v1/expenses', async (req, res, next) => {
        try{
            await expenseService.DeleteExpense(req.query.id);
            sendAPIResponse(res, StatusCodes.OK);
        }
        catch(err){
            next(err);
        }
    })

    app.use('*', (req, res, next) => {
        sendAPIResponse(res, StatusCodes.NOT_FOUND);
    })

}

module.exports = {
    ExpenseAPI
}