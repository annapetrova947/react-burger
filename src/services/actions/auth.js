import { register, login, logoutUser } from "./../api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_RESPONSE = "REGISTER_RESPONSE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";

export const USER_LOGOUT = "USER_LOGOUT";
export const CHECK_TOKEN = "CHECK_TOKEN";

export const registerUser = (userData) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    register(userData)
      .then((res) => {
        if (res) {
          dispatch({
            type: REGISTER_RESPONSE,
            response: res,
          });
        } else {
          dispatch({
            type: REGISTER_ERROR,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};

export const loginUser = (userData) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    login(userData)
      .then((res) => {
        if (res && res["success"] === true) {
          dispatch({
            type: LOGIN_RESPONSE,
            response: res,
          });
        } else {
          dispatch({
            type: LOGIN_ERROR,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};

export const logout = () => {
  return function (dispatch) {
    logoutUser()
      .then((res) => {
        if (res) {
          dispatch({
            type: USER_LOGOUT,
            response: res,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};

export const checkToken = () => {
  return function (dispatch) {
    if (localStorage.getItem("accessToken")) {
      dispatch({
        type: CHECK_TOKEN,
      });
    }
  };
};
