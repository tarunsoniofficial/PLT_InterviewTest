export const SET_API_DATA = 'SET_API_DATA' 
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART' 

export const setApiData = (data) => dispatch => {
    dispatch({
        type:SET_API_DATA,
        payload:data
    })
}


export const addToCart = (product) => dispatch => {
    dispatch({
        type:ADD_TO_CART,
        payload:product
    })
}


export const removeFromCart = (product) => dispatch => {
    dispatch({
        type:REMOVE_FROM_CART,
        payload:product
    })
}