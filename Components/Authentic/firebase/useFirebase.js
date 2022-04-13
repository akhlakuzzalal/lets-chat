/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

const useFirebase = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //   onstate change
  function onAuthStateChanged(user) {
    setUser(user);
    setLoading(false);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return [{}];
  }

  if (!user) {
    return setUser({});
  }

  //   create Account
  const createAccount = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password);
  };

  //   LogIn
  const logIn = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  };

  //   logOut
  const logOut = () => {
    auth()
      .signOut()
      .then(() => setUser({}));
  };
  return [
    {
      user,
      loading,
      createAccount,
      logOut,
      error,
      setError,
      logIn,
      setUser,
      setError,
      setLoading,
    },
  ];
};

export default useFirebase;
