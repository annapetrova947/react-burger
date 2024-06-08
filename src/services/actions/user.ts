import { getUserData, updateUserData } from "../api";

export const GET_USER_DATA = "GET_USER_DATA";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

type TUserDate = {
  name: string,
  email: string,
  password: string
}

export interface IGetUserDataAction {
  type: typeof GET_USER_DATA,
  response: {
    user: TUserDate
  }
}

export interface IUpdateUserDataAction {
  type: typeof UPDATE_USER_DATA,
  response: {
    user: TUserDate
  }
  
}

export type TUserActionTypes = IGetUserDataAction | IUpdateUserDataAction

export const getUser = () => {
  return async function (dispatch: (action: TUserActionTypes) => void) {
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

export const updateUser = (userData: TUserDate) => {
  return async function (dispatch: (action: TUserActionTypes) => void) {
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
