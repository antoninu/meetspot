const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: action.newUser,
      };

    case 'LOG_OUT':
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
