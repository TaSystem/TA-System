import { SET_DETAIL_NISIT, SET_REGISTER_NISIT ,SET_BANK_NISIT} from "../types";
import Axios from "../../config/Axios";

//Action Create

export const setDetailNisit = (data) => (dispatch) => {
  dispatch({
    type: SET_DETAIL_NISIT,
    payload: data,
  });
};

export const setRegisterNisit = (data) => (dispatch) => {
  Axios.put("/users/update-profile", {
    id: data.id,
    name: data.name,
    lastname: data.lastname,
    idStudent: data.idStudent,
    level: data.level,
    department: data.department,
    tel: data.tel,
  })
    .then((res) => {
      dispatch({
        type: SET_REGISTER_NISIT,
        payload: data,
      });
      console.log("setRegisterNisit Success");
    })
    .catch((error) => {
      console.log("setRegisterNisit unSuccess", error);
    });
};


export const setBankNisit = (data) => (dispatch) => {
  Axios.put("/users/update-profile", {
    // id: data.id,
    // name: data.name,
    // lastname: data.lastname,
    // idStudent: data.idStudent,
    // level: data.level,
    // department: data.department,
    // tel: data.tel,
  })
    .then((res) => {
      dispatch({
        type: SET_BANK_NISIT,
        payload: data,
      });
      console.log("setRegisterNisit Success");
    })
    .catch((error) => {
      console.log("setRegisterNisit unSuccess", error);
    });
};
