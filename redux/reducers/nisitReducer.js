import { SET_DETAIL_NISIT, SET_REGISTER_NISIT, SET_BANK_NISIT } from "../types";

const initialState = {
  nisit: [],
  loading: false,
};

const nisitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAIL_NISIT:
      console.log("reducer is ", action.payload);
      return {
        ...state,
        nisit: action.payload,
      };
    case SET_REGISTER_NISIT:
      console.log("reducer is ", action.payload);
      return {
        ...state,
        nisit: [...state.nisit, action.payload],
      };
    case SET_BANK_NISIT:
      console.log("reducer is ", action.payload);
      return {
        ...state,
        nisit: [...state.nisit, action.payload],
      };
    default:
      console.log("error");
      console.log(action.type);
      return {
        ...state,
      };
  }
};

export default nisitReducer;
