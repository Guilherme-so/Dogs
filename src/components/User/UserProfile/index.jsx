import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../../Feed";

function UserProfile() {
  const {user} = useParams()
  console.log(user)

  return (
    <section className="container mainContainer">
      <h1 className="title">{user}</h1>
      <Feed  user={user} />
    </section>
  );
}

export default UserProfile;
