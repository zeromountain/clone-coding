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
        setUserObj(user);
      }
      setInit(true);
    });
  }, [])


  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing .... " }
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
