import express, { RequestHandler } from 'express';
import cloudinary from '../util/cloudinary';
import { Tweet, User } from '../model';

export const createTweet: RequestHandler = async (req: express.Request, res: express.Response) => {
  try {
    const user = res.locals.user;
    if (!user || !user.fullName) {
      return res.status(400).json({ message: 'User not found' });
    }
    const { content } = req.body;
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'twitter-image',
      });
    }

    const dateTweet = new Date().toISOString();
    const tweet = new Tweet({
      content,
      userName: user.userName,
      fullName: user.fullName,
      dateTweet,
      image: result ? result.secure_url : undefined,
      cloudinaryId: result ? result.public_id : undefined,
    });
    await tweet.save();
    return res.status(200).json(tweet);
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTweetByUserName: RequestHandler = async (req, res) => {
  try {
    const { userName } = req.params;
    const tweetFind = await Tweet.find({ userName: userName }).sort({ dateTweet: -1 });
    if (!tweetFind) throw new Error('User not found');

    res.status(200).json(tweetFind);
  } catch (error) {
    res.status(500).json('Internal server error');
  }
};

export const getTweetByFollowing: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const userFind = await User.findOne({ userName: user.userName });
    if (!userFind) throw new Error('User not found');
    const followingUserName = userFind.following.map((user) => user.userName);
    followingUserName.push(user.userName);
    const tweets = await Tweet.find({ userName: { $in: followingUserName } })
      .sort({ dateTweet: -1 })
      .limit(20);
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json('Internal server error');
  }
};

export const getTweetById: RequestHandler = async (req, res) => {
  try {
    const { tweetId } = req.params;

    console.log('tweet find', tweetId);

    const tweetFind = await Tweet.findById({ _id: tweetId });

    if (!tweetFind) {
      return res.status(404).json('Tweet Not Found');
    }

    return res.status(200).json(tweetFind);
  } catch (error) {
    return res.status(500).json('Interval ');
  }
};
export const updateCountLike: RequestHandler = async (req, res) => {
  try {
    const { TweetId } = req.params;

    const user = res.locals.user;
    const tweet = await Tweet.findOne({ _id: TweetId });
    if (!tweet) {
      throw new Error('Tweet not found');
    }

    // Kiểm tra xem user có trong mảng likes không
    const isUserLiked = tweet.likes.some((element) => element.userName === user.userName);

    if (isUserLiked) {
      // Nếu đã thích, sử dụng $pull để xóa userName khỏi mảng likes
      await Tweet.updateOne(
        { _id: TweetId },
        { $pull: { likes: { userName: user.userName } } }
      );
    } else {
      // Nếu chưa thích, sử dụng $addToSet để thêm userName vào mảng likes
      await Tweet.updateOne(
        { _id: TweetId },
        { $addToSet: { likes: { userName: user.userName } } }
      );
    }

    const updatedTweet = await Tweet.findOne({ _id: TweetId });
    console.log('Updated tweet:', updatedTweet);
    res.status(200).json(updatedTweet);
  } catch (error) {
    console.error('Error updating tweet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCountBookmark: RequestHandler = async (req, res) => {
  try {
    const { TweetId } = req.params;
    const user = res.locals.user;
    const tweet = await Tweet.findById(TweetId);

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    const isBookmarked = tweet.bookmarks.some((bookmark) => bookmark.userName === user.userName);

    if (isBookmarked) {
      tweet.bookmarks = tweet.bookmarks.filter((bookmark) => bookmark.userName !== user.userName);
    } else {
      tweet.bookmarks.push({ userName: user.userName });
    }

    const updatedTweet = await tweet.save();

    res.status(200).json(updatedTweet);
  } catch (error) {
    console.error('Error updating tweet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTweet: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const { content, _id } = req.body;
    const file = req.file;
    const tweet = await Tweet.findOne({ _id, userName: user.userName });

    if (!tweet) {
      throw new Error('Tweet không tồn tại');
    }

    // Kiểm tra và cập nhật nội dung nếu có
    if (content !== undefined) {
      tweet.content = content;
    }

    // Kiểm tra và cập nhật ảnh nếu có
    if (file) {
      // Xóa ảnh hiện tại nếu có
      if (tweet.cloudinaryId) {
        await cloudinary.uploader.destroy(tweet.cloudinaryId);
      }

      // Tải ảnh mới lên
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'twitter-image',
      });

      tweet.image = result.secure_url;
      tweet.cloudinaryId = result.public_id;
    }

    // Lưu tweet chỉ nếu có cập nhật nội dung hoặc ảnh
    if (content !== undefined || file) {
      await tweet.save();
    }

    res.status(200).json(tweet);
  } catch (error) {
    console.error('Lỗi khi cập nhật tweet:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
};


export const updateTweetNumber: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const { content, _id, deleteImage, deleteContent } = req.body;
    const file = req.file;
    const tweet = await Tweet.findOne({ _id, userName: user.userName });
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    if (deleteImage && tweet.cloudinaryId) {
      await cloudinary.uploader.destroy(tweet.cloudinaryId);
      tweet.cloudinaryId = '';
      tweet.image = '';
    }

    if (deleteContent) {
      tweet.content = '';
    } else {
      tweet.content = content;
    }
    let result;
    if (file) {
      result = await cloudinary.uploader.upload(file.path, {
        folder: 'twitter-image',
      });
      if (tweet.cloudinaryId) {
        await cloudinary.uploader.destroy(tweet.cloudinaryId);
      }
    }
    if (result) {
      tweet.image = result.secure_url;
    }

    await tweet.save();

    res.status(200).json(tweet);
  } catch (error) {
    console.error('Error updating tweet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const deleteTweet: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const tweetId = req.body._id;
    console.log('id', tweetId);
    if (!tweetId) {
      throw new Error('Invalid tweet ID');
    }
    const tweet = await Tweet.findOne({ _id: tweetId, userName: user.userName });
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    await Tweet.deleteOne({ _id: tweetId });
    res.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: '?' });
  }
};
export const getBookmarkByUserName: RequestHandler = async (req, res) => {
  try {
    const user = res.locals.user;
    const tweetFind = await Tweet.find({ 'bookmarks.userName': user.userName });
    console.log(tweetFind);
    if (!tweetFind) throw new Error('User not found');

    res.status(200).json(tweetFind);
  } catch (error) {
    res.status(500).json('Internal server error');
  }
};
