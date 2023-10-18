import mongoose from 'mongoose';
interface ILike {
  userName: string;
}
interface IBookmark {
  userName: string;
}
interface ITweet extends Document {
  content: string;
  userName: string;
  fullName: string;
  dateTweet: Date;
  image: string;
  cloudinaryId: string;
  likes: ILike[];
  bookmarks: IBookmark[];
}

const tweetSchema = new mongoose.Schema<ITweet>({
  content: { type: String, required: false },
  userName: { type: String, required: true },
  fullName: { type: String, required: true },
  dateTweet: { type: Date, default: Date.now },
  image: { type: String, required: false },
  cloudinaryId: { type: String, require: false },
  likes: { type: [{ userName: String }], default: [] },
  bookmarks: { type: [{ userName: String }], default: [] },
});

export const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema);
