import { GET_USER_DATA, UPDATE_USER_DATA, TUserActionTypes } from "../actions/user";


type TUserState = {
  email: string,
  name: string,
}

const initialState: TUserState = {
  email: "",
  name: "",
};

export const userReducer = (state = initialState, action: TUserActionTypes) => {
  switch (action.type) {
    case GET_USER_DATA: {
      return { ...action.response.user };
    }
    case UPDATE_USER_DATA: {
      return { ...action.response.user };
    }

    default: {
      return state;
    }
  }
};
