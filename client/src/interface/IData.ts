interface IData {
  id: string;
  name: String;
  username: string;
  description: string;
  img: string;
  like: [{ username: string; name: string; at: string }];
  profile: string;
  cmt: [{ username: string; name: string; content: string; at: string }];
}

export default IData;
