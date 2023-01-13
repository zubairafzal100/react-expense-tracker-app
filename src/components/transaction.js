import React, { useContext, useState } from 'react';
import './transaction.css';
import { TransContext } from '../TransContext';

const Transaction = () => {

    let { transactions, addTransaction, delTransaction } = useContext(TransContext);

    let [newDesc, setNewDesc] = useState('');
    let [newAmount, setNewAmount] = useState(0);

    let id = Math.random();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (Number(newAmount) === 0) {
            alert('Please add correct amount');
            return false;
        }

        addTransaction(
            {
                desc: newDesc,
                amount: Number(newAmount),
                id
            }
        )

        setNewAmount(0);
        setNewDesc('');
    }

    const getIncome = () => {
        let income = 0
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].amount > 0) {
                income = income + transactions[i].amount
            }
        }
        return income;
    }

    const getExpense = () => {
        let expense = 0
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].amount < 0) {
                expense = expense + transactions[i].amount
            }
        }
        return expense
    }

    const totalBal = getIncome() + getExpense() ? Math.abs(getIncome() + getExpense()) : 0.00;

    const handleDelete = (id) => {
        delTransaction(id)
    }

    return (
        <div className='container'>
            {/* App Title */}
            <h2 className='app-title'>Expense Tracker by Zubair Afzal</h2>

            {/* Total Balance */}
            <div className='balance-container'>
                <h4>current balance</h4>
                <h1>{getIncome() + getExpense() >= 0 ? '' : '-'}${totalBal.toFixed(2)}</h1>
            </div>

            {/* Total Incomes & Expenses */}
            <div className='income_expense-container'>
                <div className='income'>
                    <h4>income</h4>
                    <h3>${getIncome() > 0 ? getIncome().toFixed(2) : 0.00.toFixed(2)}</h3>
                </div>
                <div className='expense'>
                    <h4>expense</h4>
                    <h3>${getExpense() < 0 ? Math.abs(getExpense()).toFixed(2) : 0.00.toFixed(2)}</h3>
                </div>
            </div>

            {/* Transaction History */}

            <div className='transcation-history-container'>
                <h3>Transaction History</h3>

                <hr />

                <ul>
                    {transactions.map((transaction, ind) => {
                        return (
                            <li key={ind} className={`${transaction.amount > 0 ? 'income' : 'expense'}`}>
                                <button onClick={()=>handleDelete(transaction.id)} type='button' className='del-transaction'>X</button>
                                <p>{transaction.desc}</p>
                                <p>{transaction.amount > 0 ? '+' : '-'}${`${Math.abs(transaction.amount)}`}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Add New Transaction */}

            <div className='new-transaction-container'>
                <h3>Add New Transaction</h3>
                <hr />
            </div>

            {/* Transaction Form */}

            <form className='transaction-form' onSubmit={handleSubmit}>
                <div>
                    <h4>
                        Description
                    </h4>
                    <input placeholder='Detail of Transaction' value={newDesc} autoFocus type="text" onChange={(e) => setNewDesc(e.target.value)} required />
                </div>
                <div>
                    <h4>
                        Transaction Amount
                    </h4>
                    <input placeholder='Dollar Value of Transaction' id={id} value={newAmount} type="number" onChange={(e) => setNewAmount(e.target.value)} required />
                </div>
                <input className='submit-btn' type="submit" value='Add Transaction' />
            </form>
        </div>
    )
}

export default Transaction;
