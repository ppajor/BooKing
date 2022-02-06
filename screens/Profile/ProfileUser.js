import React from "react";
import Screen from "../../components/Screen";
import UserProfileHeader from "../../components/UserProfileHeader";

function ProfileUser({ route }) {
  const { id, username } = route.params;
  return (
    <Screen>
      <UserProfileHeader id={id} username={username} />
    </Screen>
  );
}

export default ProfileUser;
