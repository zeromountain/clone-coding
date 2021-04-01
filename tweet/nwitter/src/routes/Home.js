import { dbService } from 'fbase';
import React, {useState, useEffect} from 'react';

const Home = ({ userObj }) => {
  console.log(userObj);
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get();
  //   // console.log(dbNweets);
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     }
  //     // set function => give a function instead of value
  //     setNweets(prev => [nweetObject, ...prev]);
  //   });
  // };
  // after mounting component
  useEffect(() => {
    // getNweets();
    // onSnapsho =? 8~19 코드 비교
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setNweets(nweetArray);
    })
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid, 
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event; 
    setNweet(value);
  }
  // console.log(nweets); 
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
          <input type="submit" value="Nweet" />
        </form>
      </div>
      <div>
        {nweets.map(nweet => {
          return(
            <div key={nweet.id}>
              <h4>{nweet.text}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;