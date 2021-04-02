import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  // 컴포넌트가 마운트될때 실행
  useEffect(() => {
    // login, logout
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });

    /* think about this!!!
    authService.onAuthStateChanged((user) => {
      user.reloadUserObj = async () => {
        setUserObj(null);
        setUserObj(() => authService.currentUser);
      }
      setUserObj(user);
      setInit(true);
    })
    */
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    }); 
  }

  return (
    <>
      {init ? <AppRouter 
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)} 
        userObj={userObj} 
      /> : "Initializing .... " }
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
