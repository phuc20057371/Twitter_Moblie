import IUser from "../../interface/IUser";

export const userActions = {
  getProfileUser: {
    pending: () => ({ type: "GET_USER_PROFILE_PENDING" }),
    fulfill: (data: IUser) => ({
      type: "GET_USER_PROFILE_FULFILL",
      payload: data,
    }),
    error: (error: string) => ({
      type: "GET_USER_PROFILE_ERROR",
      payload: error,
    }),
  },
};
