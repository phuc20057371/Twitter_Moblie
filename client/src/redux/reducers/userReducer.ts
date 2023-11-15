
const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  
  type apiAction = {
    type: string;
    payload: any;
  };
  
  export const userReducer = (state = initialState, action: apiAction) => {
    switch (action.type) {
      case "GET_USER_PENDING":
        return { ...state, loading: true, error: null };
      case "GET_USER_FULFILL":
        return {
          ...state,
          data: action.payload,
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
          return {
            ...state,
            loading: false,
            data: action.payload,
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
  