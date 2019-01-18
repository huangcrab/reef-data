import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

import notifyReducer from "./reducers/notifyReducer";
import settingReducer from "./reducers/settingReducer";

const firebaseConfig = {
  apiKey: "AIzaSyAgcKhJ-9Lte7lTzq7HTy5QMUO84RDsOVc",
  authDomain: "reef-data-f2258.firebaseapp.com",
  databaseURL: "https://reef-data-f2258.firebaseio.com",
  projectId: "reef-data-f2258",
  storageBucket: "reef-data-f2258.appspot.com",
  messagingSenderId: "8080182380"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

//init firebase instance
firebase.initializeApp(firebaseConfig);
//init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  setting: settingReducer
});

//check for localstorage

if (localStorage.getItem("setting") == null) {
  const defaultSetting = {
    allowRegistration: false
  };

  localStorage.setItem("setting", JSON.stringify(defaultSetting));
}

const initialState = { setting: JSON.parse(localStorage.getItem("setting")) };
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()) ||
      compose
  )
);

export default store;
