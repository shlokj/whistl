/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import moment from 'moment'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Snapshot listener that will invoke the callback function provided as an argument
export const getPosts = async (callback) => {
  const q = query(collection(db, "posts"));

  return onSnapshot(q, (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    callback(posts);
  });
};

export const updatePost = async (id, upvoteCount) => {
  await updateDoc(doc(db, "posts", id), {
    upvoteCount: upvoteCount,
  });
};

// Add a post
export const addPost = async (title, body, time, tags, coords) => {
  await addDoc(collection(db, "posts"), {
    title,
    body,
    time,
    tags,
    coords,
    creationTime: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
    upvoteCount: 0,
  });
};
