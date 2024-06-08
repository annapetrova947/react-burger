import {
  FORGOT_PASSWORD_RESPONSE,
  RESRET_PASSWORD_RESPONSE,
  PasswordActionTypes
} from "../actions/password";

export interface  IPasswordState {
  isCodeRequested: boolean;
  forgotPasswordResponse: {
    success: boolean
  };
  resetPasswordResponse: {
    success: boolean
  }
}

const initialState: IPasswordState = {
  forgotPasswordResponse: {
    success: false
  },
  resetPasswordResponse: {
    success: false
  },
  isCodeRequested: false,
};

export const passwordReducer = (state = initialState, action: PasswordActionTypes) => {
  switch (action.type) {
    case FORGOT_PASSWORD_RESPONSE: {
      return {
        ...state,
        forgotPasswordResponse: { ...action.response },
        isCodeRequested: true,
      };
    }
    case RESRET_PASSWORD_RESPONSE: {
      return {
        ...state,
        resetPasswordResponse: { ...action.response },
      };
    }
    default: {
      return state;
    }
  }
};
