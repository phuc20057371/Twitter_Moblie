import { middlewareJWT } from './../middlewares/middleware';
import express from 'express';
import { upload } from '../util/multer';
import {
  createTweet,
  deleteTweet,
  getBookmarkByUserName,
  getTweetByFollowing,
  getTweetById,
  getTweetByUserName,
  updateCountBookmark,
  updateCountLike,
  updateTweet,
} from '../controllers/tweet.controller';

const tweetRouter = (router: express.Router) => {
  router.post('/tweet', middlewareJWT, upload.single('image'), createTweet);
  router.get('/tweet', middlewareJWT, getTweetByFollowing);
  router.get('/profile/tweet/:userName', getTweetByUserName);
  router.get('/tweet/:tweetId', getTweetById);

  router.patch('/tweet', middlewareJWT, upload.single('image'), updateTweet);
  router.patch('/tweet/like/:TweetId', middlewareJWT, updateCountLike);
  router.patch('/tweet/bookmark/:TweetId', middlewareJWT, updateCountBookmark);
  router.delete('/tweet', middlewareJWT, deleteTweet);
  router.get('/bookmark', middlewareJWT, getBookmarkByUserName);
};

export default tweetRouter;
