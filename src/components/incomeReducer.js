function reducer(state, action) {
    switch (action.type) {
        case "ADD-INCOME":
            return [...state, action.payload];
        default:
            return state;
    }
}

export default reducer;