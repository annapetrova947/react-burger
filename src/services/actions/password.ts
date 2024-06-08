import { forgotPassword, resetPassword } from "../api";

export const FORGOT_PASSWORD_RESPONSE = "FORGOT_PASSWORD_RESPONSE";
export const RESRET_PASSWORD_RESPONSE = "RESRET_PASSWORD_RESPONSE";

interface ForgotPasswordAction {
  type: typeof FORGOT_PASSWORD_RESPONSE;
  response: {
    success: boolean
  }
}

interface ResetPasswordAction {
  type: typeof RESRET_PASSWORD_RESPONSE;
  response: {
    success: boolean
  }
}

export type PasswordActionTypes = ForgotPasswordAction | ResetPasswordAction

export const userForgotPassword = (email: string) => {
  return function (dispatch: (action: PasswordActionTypes) => void) {
    forgotPassword(email)
      .then((res) => {
        if (res) {
          dispatch({
            type: FORGOT_PASSWORD_RESPONSE,
            response: res,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};

export const userResetPassword = (password: string, token: string) => {
  return function (dispatch: (action: PasswordActionTypes) => void) {
    resetPassword(password, token)
      .then((res) => {
        if (res) {
          dispatch({
            type: RESRET_PASSWORD_RESPONSE,
            response: res,
          });
        }
      })
      .catch((e) => console.log(e));
  };
};
