import { useSelector } from "react-redux";
import { selectGetModal } from "../../Redux/user/userSlice";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

function Feed({user}) {
  const modal = useSelector(selectGetModal);

  return (
    <div>
      {modal && <FeedModal />}
      <FeedPhotos user={user}/>
    </div>
  );
}

export default Feed;
