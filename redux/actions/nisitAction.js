import {
  SET_DETAIL_NISIT,
  SET_REGISTER_NISIT,
  SET_BANK_NISIT,
  GET_DETAIL_NISIT,
  GET_COURSES_NISIT
} from "../types";
import Axios from "../../config/Axios";
import { useRouter } from "next/router";
//Action Create

export const setDetailNisit = (data) => (dispatch) => {
  dispatch({
    type: SET_DETAIL_NISIT,
    payload: data,
  });
};

export const getDetailNisit = (email) => (dispatch) => {
  Axios.post("/users/profiledetail", {
    email: email,
  })
    .then((res) => {
      console.log("getDetailNisit action :", res.data[0]);
      dispatch({
        type: GET_DETAIL_NISIT,
        payload: res.data[0],
      });
    })
    .catch(() => {
      console.log("error post");
    });
};

export const setRegisterNisit = (data) => (dispatch) => {
  // const router = useRouter()
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
        payload: res.data[0],
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
        payload: res.data[0],
      });
      console.log("setRegisterNisit Success");
    })
    .catch((error) => {
      console.log("setRegisterNisit unSuccess", error);
    });
};

export const getCoursesNisit = (email) => (dispatch) => {
  Axios.post("/courses/student-apply", {
    email: email,
  })
    .then((res) => {
      console.log("getCoursesNisit action :", res.data , 'my email is ',email);
      dispatch({
        type: GET_COURSES_NISIT,
        payload: res.data,
      });
    })
    .catch(() => {
      console.log("error post");
    });
};
