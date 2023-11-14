const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  
  type apiAction = {
    type: string;
    payload: any;
  };
export const imageReducer = (state = initialState, action: apiAction) =>{
    switch(action.type){
        case 'GET_IMAGE_PENDING':
      return { ...state, loading: true };
    case 'GET_IMAGE_FULFILL':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case 'GET_IMAGE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default: return state;
    }
}