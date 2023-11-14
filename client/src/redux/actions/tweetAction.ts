export const tweetAction = {
    getTweet: {
        pending: () => ({ type: 'GET_TWEET_PENDING' }),
        fulfill: (data: any) => ({
          type: 'GET_TWEET_FULFILL',
          payload: data,
        }),
        errors: (error: string) => ({ type: 'GET_TWEET_ERROR', payload: error }),
      },
      updateTweet:{
        pending: () => ({ type: 'UPDATE_TWEET_PENDING' }),
        fulfill: (data: any) => ({
          type: 'UPDATE_TWEET_FULFILL',
          payload: data,
        }),
        errors: (error: string) => ({ type: 'UPDATE_TWEET_ERROR', payload: error }),
      }
    }