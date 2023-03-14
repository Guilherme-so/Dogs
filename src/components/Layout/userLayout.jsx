import React from "react";
import UserHeader from "../User/UserHeader";

function UserLayout({children}) {
  return (
    <div className="container">
      <UserHeader />
      {children}
    </div>
  );
}

export default UserLayout;
