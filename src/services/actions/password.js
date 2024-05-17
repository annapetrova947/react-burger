import { forgotPassword, resetPassword } from "./../api";

export const FORGOT_PASSWORD_RESPONSE = "FORGOT_PASSWORD_RESPONSE";
export const RESRET_PASSWORD_RESPONSE = "RESRET_PASSWORD_RESPONSE";

export const userForgotPassword = (email) => {
  return function (dispatch) {
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

export const userResetPassword = (password, token) => {
  return function (dispatch) {
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
