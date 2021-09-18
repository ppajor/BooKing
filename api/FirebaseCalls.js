import firebase from "firebase";

export const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User signed out!");
      props.history.push("/chooseLoginVariant");
    });
};
