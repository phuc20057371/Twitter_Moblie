
const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  
  type apiAction = {
    type: string;
    payload: any;
  };
  function formatTweetDate(dateTweet: any) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    const formattedDate = new Date(dateTweet).toLocaleDateString(
      "vi-VN",
      options
    );
    return formattedDate.replace(/,/g, "");
  }
  export const userReducer = (state = initialState, action: apiAction) => {
    switch (action.type) {
      case "GET_USER_PENDING":
        return { ...state, loading: true, error: null };
        case "GET_USER_FULFILL":
          const user = action.payload;
          const formattedDateJoined = formatTweetDate(user.dateJoined);
          const formattedUser = {
            ...user,
            dateJoined: formattedDateJoined,
          };
    
          return {
            ...state,
            data: formattedUser,
            loading: false,
            error: null,
          };
      case "GET_USER_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case 'UPDATE_USER_PROFILE_PENDING':
          return { ...state, loading: true };
          case 'UPDATE_USER_PROFILE_FULFILL':
            const userUpdate = action.payload;
            const formateDate = formatTweetDate(userUpdate.dateJoined); // Use userUpdate instead of user
            const formatDatedJoined = {
              ...userUpdate,
              dateJoined: formateDate,
            };
          
            return {
              ...state,
              data: formatDatedJoined,
              loading: false,
              error: null,
            };
          
        case 'UPDATE_USER_PROFILE_ERROR':
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
      default:
        return state;
    }
  };
  