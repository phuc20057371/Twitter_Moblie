import IUser from "../../interface/IUser";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

type apiAction = {
  type: string;
  payload: IUser;
};

export const userReducer = (state = initialState, action: apiAction) => {
  switch (action.type) {
    case "GET_USER_PROFILE_PENDING":
      return { ...state, loading: true, error: null };
    case "GET_USER_PROFILE_FULFILL":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "GET_USER_PROFILE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
