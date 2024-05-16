import {
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_RESPONSE,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_RESPONSE,
  USER_LOGOUT,
  CHECK_TOKEN,
} from "./../actions/auth";

const initialState = {
  isLoggedIn: false,
  registerRequest: false,
  registerFailed: false,
  registerResponse: {},

  loginRequest: false,
  loginFailed: false,
  loginResponse: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_RESPONSE: {
      return {
        ...state,
        registerFailed: false,
        registerResponse: { ...action.response },
        registerRequest: false,
      };
    }
    case REGISTER_ERROR: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_RESPONSE: {
      return {
        ...state,
        loginFailed: false,
        loginResponse: { ...action.response },
        loginRequest: false,
        isLoggedIn: true,
      };
    }
    case LOGIN_ERROR: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case USER_LOGOUT: {
      console.log("action.response", action.response);
      return {
        ...state,
        email: "",
        name: "",
        isLoggedIn: false,
      };
    }
    case CHECK_TOKEN: {
      console.log("checked");
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    default: {
      return state;
    }
  }
};
