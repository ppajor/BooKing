import firebase from "firebase";

export const anonymousRegister = () => {
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      console.log("User signed in anonymously");
    })
    .catch((error) => {
      if (error.code === "auth/operation-not-allowed") {
        console.log("Enable anonymous in your firebase console.");
      }
      console.error(error);
    });
};

export const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User signed out!");
    });
};

export const getFirebase = async (path) => {
  console.log("POJAWIAM SIĘ MÓWIĘ JESTEM");
  return await firebase
    .database()
    .ref(path)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) return snapshot.val();
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const updateFirebase = async (path, data) => {
  console.log("WYSUWA SIĘ NA CZYSTĄ POZYCJE");
  return await firebase
    .database()
    .ref(path)
    .update(data)
    .then(() => {
      console.log("update data");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const removeFirebase = async (path) => {
  firebase.database().ref(path).remove();
};
