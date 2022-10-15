import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTweets from "../components/profile/ProfileTweets";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

const style = {
  wrapper: `flex justify-center h-auto w-screen select-none bg-[#15202b] text-white `,
  content: `max-w-[1400px] w-2/3 flex `,
  //mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] `,
};

function profile() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon={"Profile"} />
        <div className={style.mainContent}>
          <ProfileHeader />
          <ProfileTweets />
        </div>
        <Widgets />
      </div>
    </div>
  );
}

export default profile;
