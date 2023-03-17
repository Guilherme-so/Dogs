import { useSelector } from "react-redux";
import { selectGetModal } from "../../Redux/user/userSlice";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

function Feed({userId}) {
  const modal = useSelector(selectGetModal);

  return (
    <div>
      {modal && <FeedModal />}
      <FeedPhotos userId={userId}/>
    </div>
  );
}

export default Feed;
