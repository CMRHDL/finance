const settings = (state = { attributions: [] }, action) => {
  switch (action.type) {
    case "ADD_ATTRIBUTION":
      return {
        ...state,
        attributions: [...state.attributions, action.attribution]
      };
    case "SET_ATTRIBUTION":
      return {
        ...state,
        attributions: action.attributions
      };
    default:
      return state;
  }
};

export default settings;
