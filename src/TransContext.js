import { createContext, useReducer } from "react";
import transactionReducer from "./TransReducer";


const initialTransactions = [
    // { desc: 'Cash', amount: 700, sign: '+' },
    // { desc: 'Book', amount: 70, sign: '-' },
    // { desc: 'Camera', amount: 190, sign: '-' },
    // { desc: 'Deposit', amount: 300, sign: '+' },
]

export const TransContext = createContext(initialTransactions);

const TransactionProvider = ({ children }) => {
    let [state, dispatch] = useReducer(transactionReducer, initialTransactions);

    function addTransaction(transObj) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: {
                desc: transObj.desc,
                amount: transObj.amount,
                id: transObj.id
            }
        })
    }

    function delTransaction(transID) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: transID
        })
    }

    return (
        <TransContext.Provider value={{
            transactions: state,
            addTransaction,
            delTransaction
        }}>
            {children}
        </TransContext.Provider>
    )
}

export default TransactionProvider