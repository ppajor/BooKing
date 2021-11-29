import firebase from "firebase";
import { doc, getDoc, setDoc, get } from "firebase/firestore";

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
/*
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
*/
//*************************************************FIRESTORE*********************************************************

//****************************************get

export const getUserName = async () => {
  let usersRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
  let user = await usersRef.get();
  return user.data().username;
};

export const getLastReadID = async () => {
  let ref = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
  let result = await ref.get();
  let array = result.data().lastRead;
  let last = array[length - 1];
  //console.log("lastread array:", last);
  return last;
};

export const getLastReadBook = async (id) => {
  let ref = firebase
    .firestore()
    .collection("users/" + firebase.auth().currentUser.uid + "/booksReadNow")
    .doc(id);
  let result = await ref.get();
  return result.data();
};

export const searchUsername = async (username) => {
  let usernamesRef = firebase.firestore().collection("usernames").doc(username);
  let user = await usernamesRef.get();
  if (user) return user.data();
  else return null;
};

export const getFriendToRead = async (friendID) => {
  let booksRef = firebase.firestore().collection("users/" + friendID + "/booksToRead");
  let books = await booksRef.get();
  const snaps = [];
  for (const doc of books.docs) {
    snaps.push(doc.data());
  }
  return snaps;
};

export const getFriendReadNow = async (friendID) => {
  let booksRef = firebase.firestore().collection("users/" + friendID + "/booksReadNow");
  let books = await booksRef.get();
  const snaps = [];
  for (const doc of books.docs) {
    snaps.push(doc.data());
  }
  return snaps;
};

//**************************************************set

export const setFirestore = async (path, id, data) => {
  await firebase
    .firestore()
    .collection(path)
    .doc(id)
    .set(data)
    .then(() => console.log("set firestore successful"))
    .catch((error) => console.log("Error", error));
};

export const addReadNowBook = async (id, bookTitle, author, bookDescription, thumbnail, pages) => {
  const dataToUpdate = {
    id: id,
    title: bookTitle,
    authors: author,
    description: bookDescription,
    thumbnail: thumbnail,
    pageCount: parseInt(pages),
    lastReadPageNumber: 1,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  };

  setFirestore("users/" + firebase.auth().currentUser.uid + "/booksReadNow", id, dataToUpdate);
};

export const addBookToDatabase = (id, bookTitle, author, bookDescription, thumbnail, pages) => {
  const dataToUpdate = {
    id: id,
    title: bookTitle,
    authors: author,
    description: bookDescription,
    thumbnail: thumbnail,
    pageCount: parseInt(pages),
    lastReadPageNumber: 1,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  };
  //console.log(`THUMBNAIL FIREBASEFUNC ${thumbnail}`);
  setFirestore("/users/" + firebase.auth().currentUser.uid + "/booksToRead", id, dataToUpdate);
};

export const addBookToAlreadyRead = (id, bookTitle, author, bookDescription, thumbnail, pages) => {
  const dataToUpdate = {
    id: id,
    title: bookTitle,
    authors: author,
    description: bookDescription,
    thumbnail: thumbnail,
    pageCount: parseInt(pages),
    date: firebase.firestore.FieldValue.serverTimestamp(),
  };
  //console.log(`THUMBNAIL FIREBASEFUNC ${thumbnail}`);
  setFirestore("/users/" + firebase.auth().currentUser.uid + "/booksAlreadyRead", id, dataToUpdate);
};

export const addReview = (bookID, data, reviewID) => {
  setFirestore("/books/" + bookID + "/reviews/", reviewID, data);
};

export const addComment = (bookID, commentID, data) => {
  setFirestore("/books/" + bookID + "/comments/", commentID, data);
};

export const addCreatedUserData = (userID, data) => {
  setFirestore("users/", userID, data);
};

export const addCreatedUsername = (username, data) => {
  setFirestore("usernames/", username, data);
};

//**************************************************remove
const removeFirestore = async (path, docID) => {
  await firebase
    .firestore()
    .collection(path)
    .doc(docID)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export const removeReadNowBook = async (docID) => {
  await removeFirestore("users/" + firebase.auth().currentUser.uid + "/booksReadNow", docID);
};

export const removeToReadBook = async (docID) => {
  removeFirestore("users/" + firebase.auth().currentUser.uid + "/booksToRead", docID);
};

export const removeLastReadID = async (id) => {
  /*
  var ref = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);

  var ID = ref.update({
    lastRead: firebase.firestore.FieldValue.delete(),
  });
  */
  // console.log("remove id:", id);
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      lastRead: firebase.firestore.FieldValue.arrayRemove(id),
    });
};

//******************************************************update
export const updateFirestore = (path, id, data) => {
  firebase
    .firestore()
    .collection(path)
    .doc(id)
    .update(data)
    .then(() => console.log("Updating successful"))
    .catch((error) => console.log("Updating error: ", error));
};

export const updateLastReadBookID = (id) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      lastRead: firebase.firestore.FieldValue.arrayUnion(id),
    });
};
