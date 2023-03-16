const initialState = {
    url: null
};
  
function reducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_URL':
        return { ...state, url: action.payload };
      default:
        return state;
    }
}

export default reducer;