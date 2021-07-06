const reducer = (state, action) => {
    switch (action.type) {
        case "ADD-EXPENSE":
            return [...state, action.payload];
        case "EDIT_EXPENSE":

        default:
            return state;
    }
}

export default reducer;