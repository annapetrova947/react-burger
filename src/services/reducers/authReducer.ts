import {
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_RESPONSE,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_RESPONSE,
  USER_LOGOUT,
  CHECK_TOKEN,
  TLoginAction,
  TCheckToken,
  TRegisterActopn,
  TLogoutAction
} from "../actions/auth";


interface IAuthState{
  isLoggedIn: boolean,
  registerRequest: boolean,
  registerFailed: boolean,
  registerResponse: {
    success?: boolean
  },

  loginRequest: boolean,
  loginFailed: boolean,
  loginResponse: {
    success?: boolean
  },
};


const initialState: IAuthState = {
  isLoggedIn: false,
  registerRequest: false,
  registerFailed: false,
  registerResponse: {},

  loginRequest: false,
  loginFailed: false,
  loginResponse: {},
};

type TAction = TCheckToken | TLoginAction | TLogoutAction | TRegisterActopn

export const authReducer = (state = initialState, 
  action: TAction) => {
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
      return {
        ...state,
        email: "",
        name: "",
        isLoggedIn: false,
      };
    }
    case CHECK_TOKEN: {
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
