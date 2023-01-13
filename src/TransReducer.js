const transactionReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            return [action.payload, ...state]
        }
        case 'DELETE_TRANSACTION': {
            return state.filter((x) => x.id !== action.payload)
        }
        default:
            return state
    }
}

export default transactionReducer;