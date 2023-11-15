import IData from "../../interface/IData";

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
    day: "numeric",
  };
  const formattedDate = new Date(dateTweet).toLocaleDateString(
    "vi-VN",
    options
  );
  return formattedDate.replace(/,/g, "");
}
export const tweetRedudcer = (state = initialState, action: apiAction) => {
  switch (action.type) {
    case "GET_TWEET_PENDING":
      return { ...state, loading: true, error: null };
    case "GET_TWEET_FULFILL":
      const tweets = action.payload.map((tweet: any) => {
        const format = formatTweetDate(tweet.dateTweet);
        return {
          ...tweet,
          dateTweet: format,
        };
      });
      return {
        ...state,
        loading: false,
        data: tweets,
        error: null,
      };
    case "GET_TWEET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_TWEET_PENDING":
      return { ...state, loading: true, error: null };
    case "UPDATE_TWEET_FULFILL":
      const updatedLikes = action.payload.likes;
      const updatedTweets = (state.data||[]).map((tweet:IData) => {
        if (tweet._id === action.payload._id) {
          return {
            ...tweet,
            likes: updatedLikes,
          };
        }
        return tweet;
      });
    
      return {
        ...state,
        loading: false,
        data: updatedTweets,
        error: null,
      };
      case "UPDATE_TWEET_ERROR":
        return { ...state, loading: false, error: action.payload };
        case 'CREATE_TWEET_FULFILL':
          const { _id, content, image, userName, fullName } = action.payload;
          const dateTweet = formatTweetDate(new Date());
          const newTweet = {
            _id,
            content,
            image,
            dateTweet,
            userName,
            fullName,
          };
          const createTweet = state.data ? [newTweet, ...state.data] : [newTweet];
          return {
            loading: false,
            data: createTweet,
            error: null,
          };
    
        case 'CREATE_TWEET_ERROR':
          return { ...state, loading: false, error: action.payload };
    default: return state
  }
};
