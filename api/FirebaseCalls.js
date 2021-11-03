import firebase from "firebase";

export const registerWithEmail = async (inputEmail, inputPassword) => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(inputEmail, inputPassword)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
        setError("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
        setError("That email address is invalid!");
      }

      console.error(error);
    });
};

export const anonymousRegister = async () => {
  return await firebase
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
  return await firebase
    .database()
    .ref(path)
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) return snapshot.val();
      else return null;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const setFirebase = async (path, data) => {
  firebase
    .database()
    .ref(path)
    .set(data)
    .then(() => console.log("set data correct!"));
};

export const updateFirebase = async (path, data) => {
  return await firebase
    .database()
    .ref(path)
    .update(data)
    .then(() => {
      console.log("update data correct!");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const removeFirebase = async (path) => {
  firebase.database().ref(path).remove();
};

//functions
export const currentUserId = async () => {
  return await firebase.auth().currentUser.uid;
};

export const addBookToDatabase = (id, bookTitle, author, bookDescription, thumbnail, pages) => {
  const dataToUpdate = {
    [id]: {
      id: id,
      title: bookTitle,
      authors: author,
      description: bookDescription,
      thumbnail: thumbnail,
      pageCount: parseInt(pages),
      lastReadPageNumber: 1,
    },
  };
  //console.log(`THUMBNAIL FIREBASEFUNC ${thumbnail}`);
  updateFirebase("/users/" + firebase.auth().currentUser.uid + "/library/toRead/", dataToUpdate);
};

export const searchUsername = async (username) => {
  return await getFirebase("/usernames/" + username);
};

export const getUsername = async () => {
  const data = await getFirebase("/users/" + firebase.auth().currentUser.uid);
  return data.username;
};

export const getToRead = async (userID) => {
  const toRead = await getFirebase("/users/" + userID + "/library");
  return toRead.toRead;
};

export const addReview = async (bookID, data, reviewID) => {
  await updateFirebase("/books/" + bookID + "/reviews/" + reviewID, data);
};
