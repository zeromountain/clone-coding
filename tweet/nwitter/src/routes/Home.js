import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import React, {useState, useEffect} from 'react';

const Home = ({ userObj }) => {

  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

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
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);
    /* await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid, 
    });
    setNweet(""); */
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event; 
    setNweet(value);
  }
  const onFileChange = (event) => {
    const {
      target: { 
        files 
      }
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: {result},
      } = finishedEvent;
      setAttachment(result);  
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => setAttachment(null);
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input 
            value={nweet} 
            onChange={onChange} 
            type="text" 
            placeholder="What's on your mind?" 
            maxLength={120}
          />
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" value="Nweet" />
          { attachment &&  
            <>
              <img src={attachment} width="50px" height="50px" />
              <button onClick={onClearAttachment}>Clear</button>
            </>
          }
        </form>
      </div>
      <div>
        {nweets.map(nweet => 
          <Nweet 
            key={nweet.id} 
            nweetObj={nweet} // author, text, createdAt
            isOwner={nweet.creatorId === userObj.uid} 
          />
        )}
      </div>
    </>
  );
};

export default Home;