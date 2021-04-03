import Nweet from 'components/Nweet';
import { dbService, storageService } from 'fbase';
import React, {useState, useEffect} from 'react';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {

  const [nweets, setNweets] = useState([]);

  // after mounting component
  useEffect(() => {
    // getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setNweets(nweetArray);
    })
  }, []);

  
  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map(nweet => 
          <Nweet 
            key={nweet.id} 
            nweetObj={nweet} // author, text, createdAt
            isOwner={nweet.creatorId === userObj.uid} 
          />
        )}
      </div>
    </div>
  );
};

export default Home;