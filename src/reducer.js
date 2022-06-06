export const initialState = {
    isAuthenticated: false,
    user: {}
}

function reducer(state, action){
    switch(action.type){
        case "UPDATE_LOGIN":
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case "UPDATE_LOGOUT":
            return{
                ...state,
                isAuthenticated: false,
                user: {}
            };
        default:
            return state;
    }
}

export default reducer;