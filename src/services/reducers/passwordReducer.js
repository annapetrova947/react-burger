import {
  FORGOT_PASSWORD_RESPONSE,
  RESRET_PASSWORD_RESPONSE,
} from "./../actions/password";

const initialState = {
  forgotPasswordResponse: {},
  resetPasswordResponse: {},
  isCodeRequested: false,
};

export const passwordReducer = (state = initialState, action) => {
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
