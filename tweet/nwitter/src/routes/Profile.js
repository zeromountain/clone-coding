import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ userObj, refreshUser }) => {
  const history = useHistory();
  // const [newDisplayName, setNweDisplayName] = useState(userObj.displayName);
  const [newDisplayName, setNweDisplayName] = useState("");
  const  onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  /*
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  }
  useEffect(() => {
    getMyNweets();
  }, []);
  */

  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNweDisplayName(value);
  } 
  
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      const response = await userObj.updateProfile({
        displayName: newDisplayName, 
      }); 
      refreshUser();
      setNweDisplayName("");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input 
          onChange={onChange}
          type="text" 
          placeholder="Display name"
          value={newDisplayName}  
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}