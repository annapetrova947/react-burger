import { GET_USER_DATA, UPDATE_USER_DATA } from "./../actions/user";

const initialState = {
  email: "",
  name: "",
};

export const userReducer = (state = initialState, action) => {
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
