const InitState = {
    stock: [],
    singleStock: [],
    allStock: []
}

const getStockDetail = (state = InitState, action) => {
    switch (action.type) {
        case 'GET_ALL_STOCK_DATA':
            return {
                ...state, allStock: action.payload
            }

        case 'GET_ALL_STOCK_DETAILS':
            return {
                ...state, stock: action.payload
            }

        case 'GET_SINGLE_STOCK_DETAILS':
            return {
                ...state, singleStock: action.payload
            }

        case 'ADD_SINGLE_PURCHASE_SHARE':
            return {
                ...state, stock: [...state.stock, action.payload]
            }

        default:
            return state;
    }
}

export default getStockDetail;