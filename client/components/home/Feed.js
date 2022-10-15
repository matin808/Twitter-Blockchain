import { BsStars } from "react-icons/bs";
import TweetBox from "./TweetBox";
import Post from "../Post";

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] `,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

const tweets = [
  {
    displayName: "Matin",
    userName: "0x85dsd5sdc1sdc5s66464sd6c64sd6c6sD",
    avatar:
      "https://amazingheights.blog/wp-content/uploads/2021/10/twitter-bitcoin.png",
    text: "GM",
    isProfileImageNft: false,
    timestamp: "2021-02-14T12:00:00.000Z",
  },
  {
    displayName: "Noman",
    userName: "0x85dsd5sdc1sdc5s66464sd6c64sd6c6sD",
    avatar:
      "https://bluewhaleapps.com/wp-content/uploads/2020/01/Best-Blockchain-Twitter-Accounts-to-Follow.jpg",
    text: "GM",
    isProfileImageNft: false,
    timestamp: "2022-02-14T12:00:00.000Z",
  },
  {
    displayName: "John",
    userName: "0x85dsd5sdc1sdc5s66464sd6c64sd6c6sD",
    avatar:
      "https://www.businessinsider.in/photo/84548663/twitter-built-on-blockchain-will-let-users-monetise-their-posts-and-come-up-with-their-own-rules.jpg?imgsize=281340",
    text: "GM",
    isProfileImageNft: false,
    timestamp: "2022-10-14T12:00:00.000Z",
  },
];

function Feed() {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={tweet.displayName}
          userName={`${tweet.userName.slice(0, 4)}...${tweet.userName.slice(
            -4
          )}`}
          avatar={tweet.avatar}
          text={tweet.text}
          isProfileImageNft={tweet.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
}

export default Feed;
