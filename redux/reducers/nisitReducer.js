import {
  SET_DETAIL_NISIT,
  SET_REGISTER_NISIT,
  SET_BANK_NISIT,
  GET_DETAIL_NISIT,
  GET_COURSES_NISIT,
} from "../types";

const initialState = {
  nisit: [],
  courses : [],
  loading: false,
};

const nisitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAIL_NISIT:
      //console.log("reducer is ", action.payload);
      return {
        ...state,
        nisit: action.payload,
      };
    case SET_REGISTER_NISIT:
      //console.log("reducer is ", action.payload);
      return {
        ...state,
        nisit:  action.payload,
      };
    case SET_BANK_NISIT:
      //console.log("reducer is ", action.payload);
      return {
        ...state,
        nisit: action.payload,
      };
    case GET_DETAIL_NISIT:
      //console.log("reducer is ", action.payload);
      return {
        ...state,
        nisit: action.payload,
      };

    case GET_COURSES_NISIT:
      //console.log("reducer is ", action.payload);
      return {
        ...state,
        courses: action.payload,
      };
    default:
      //console.log("error");
      //console.log(action.type);
      return {
        ...state,
      };
  }
};

export default nisitReducer;
