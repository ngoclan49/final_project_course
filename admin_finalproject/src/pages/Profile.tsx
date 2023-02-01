import React from "react";
import { getStorageJson, USER_LOGIN } from "../util/config";
import '../assets/styles/profile.css'
import UserEdit from "./Users/UserEdit/UserEdit";
type Props = {};

const Profile = (props: Props) => {
  const userId = getStorageJson(USER_LOGIN).id;


  return (
   <UserEdit userId={userId}/>
  );
};

export default Profile;
