import { register, login, logoutUser } from "../api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_RESPONSE = "REGISTER_RESPONSE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";

export const USER_LOGOUT = "USER_LOGOUT";
export const CHECK_TOKEN = "CHECK_TOKEN";


interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST
}

interface RegisterErrorAction {
  type: typeof REGISTER_ERROR
}

interface RegisterResponse {
  type: typeof REGISTER_RESPONSE;
  response: {
    success: boolean
  }
}

export type TRegisterActopn = RegisterRequestAction | RegisterErrorAction | RegisterResponse
type TRegisterUserData = {
  email: string,
  name: string,
  password: string
}

export const registerUser = (userData: TRegisterUserData) => {
  return function (dispatch: (action: TRegisterActopn) => void) {
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

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST
}

interface LoginErrorAction{
  type: typeof LOGIN_ERROR
}

interface LoginResponseAction {
  type: typeof LOGIN_RESPONSE;
  response: {
    success: boolean
  }
}

export type TLoginAction = LoginRequestAction | LoginErrorAction | LoginResponseAction
type TLoginUserData = {
  email: string,
  password: string
}


export const loginUser = (userData: TLoginUserData) => {
  return function (dispatch: (action: TLoginAction) => void) {
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

export type TLogoutAction = {
  type: typeof USER_LOGOUT,
  response: {
    success: boolean
  }
}

export const logout = () => {
  return function (dispatch: (action: TLogoutAction)=> void) {
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

export type TCheckToken = {
  type: typeof CHECK_TOKEN,
  
}

export const checkToken = () => {
  return function (dispatch: (action: TCheckToken) => void) {
    if (localStorage.getItem("accessToken")) {
      dispatch({
        type: CHECK_TOKEN,
      });
    }
  };
};
