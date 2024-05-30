import { getUserData, updateUserData } from "./../api";

export const GET_USER_DATA = "GET_USER_DATA";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const getUser = () => {
  return async function (dispatch) {
    try {
      const res = await getUserData();
      dispatch({
        type: GET_USER_DATA,
        response: res,
      });
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };
};

export const updateUser = (userData) => {
  return async function (dispatch) {
    try {
      const res = await updateUserData(userData);

      dispatch({
        type: UPDATE_USER_DATA,
        response: res,
      });
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };
};
