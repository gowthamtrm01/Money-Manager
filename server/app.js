const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gowtham:Saipallavi@0102@cluster0.wbk9z.mongodb.net/movieData',
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const staticFiles = express.static(path.join(__dirname, '../build'))
app.use(staticFiles);

app.use('/*', staticFiles)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
})


const IncomeSchema = new mongoose.Schema({
    amount: Number,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

const ExpenseSchema = new mongoose.Schema({
    amount: Number,
    description: String,
    categories: String,
    division: String,
    createdAt: { type: Date, default: Date.now }
});

const Income = mongoose.model('Income', IncomeSchema, 'income_collection');
const Expense = mongoose.model('Expense', ExpenseSchema, 'expense_collection');

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/yearly_expenditure', (req, res) => {
    const requestBody = req.body;
    if (!Object.keys(requestBody).includes('type')) {
        const message = 'Input parameter "type" is missing';
        res.status(500).send({ message });
    }
    const pipelines = [
        {
            '$group': {
                '_id': {
                    'year': { '$year': '$createdAt' }
                },
                'total': { '$sum': '$amount' }
            }
        },
        {
            '$project': {
                'year': '$_id.year',
                'total': 1,
                '_id': 0
            }
        }]
    if (requestBody['type'] === 'income') {
        const income = Income.aggregate(pipelines,
            function (err, docs) {
                if (err) {
                    res.status(500).send({ 'message': 'Error Occurred' });
                }
                res.send(docs);
            })
    } else if (requestBody['type'] === 'expense') {
        const expense = Expense.aggregate(pipelines,
            function (err, docs) {
                if (err) {
                    res.status(500).send({ 'message': 'Error Occurred' });
                }
                console.log(docs);
                res.send(docs)
            })
    } else {
        const message = `Invalid input parameter ${requestBody['type']}`
        res.status(500).send({ message });
    }
});

app.post('/monthly_expenditure', (req, res) => {
    const requestBody = req.body;
    if (!Object.keys(requestBody).includes('type')) {
        const message = 'Input parameter "type" is missing';
        res.status(500).send({ message });
    }
    const pipelines = [
        {
            '$group': {
                '_id': {
                    'month': { '$month': '$createdAt' },
                    'year': { '$year': '$createdAt' }
                },
                'total': { '$sum': '$amount' }
            }
        },
        {
            '$project': {
                'month': '$_id.month',
                'year': '$_id.year',
                'total': 1,
                '_id': 0
            }
        }
    ];
    if (requestBody['type'] === 'income') {
        const income = Income.aggregate(pipelines,
            function (err, docs) {
                if (err) {
                    res.status(500).send({ 'message': 'Error Occurred' });
                }
                res.send(docs);
            })
    } else if (requestBody['type'] === 'expense') {
        const expense = Expense.aggregate(pipelines,
            function (err, docs) {
                if (err) {
                    res.status(500).send({ 'message': 'Error Occurred' });
                }
                console.log(docs);
                res.send(docs)
            })
    } else {
        const message = `Invalid input parameter ${requestBody['type']}`
        res.status(500).send({ message });
    }
})

app.post('/weekly_expenditure', (req, res) => {
    const requestBody = req.body;
    if (!Object.keys(requestBody).includes('type')) {
        const message = 'Input parameter "type" is missing';
        res.status(500).send({ message });
    }
    const pipelines = [
        {
            '$group': {
                '_id': {
                    'week': { '$week': '$createdAt' },
                    'year': { '$year': '$createdAt' }
                },
                'total': { '$sum': '$amount' }
            }
        },
        {
            '$project': {
                'week': '$_id.week',
                'year': '$_id.year',
                'total': 1,
                '_id': 0
            }
        }
    ];
    if (requestBody['type'] === 'income') {
        const income = Income.aggregate(pipelines,
            function (err, docs) {
                if (err) {
                    res.status(500).send({ 'message': 'Error Occurred' });
                }
                res.send(docs);
            })
    } else if (requestBody['type'] === 'expense') {
        const expense = Expense.aggregate(pipelines,
            function (err, docs) {
                if (err) {
                    res.status(500).send({ 'message': 'Error Occurred' });
                }
                console.log(docs);
                res.send(docs)
            })
    } else {
        const message = `Invalid input parameter ${requestBody['type']}`
        res.status(500).send({ message });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})