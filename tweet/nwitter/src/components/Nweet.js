import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = await window.confirm("Are you sure you want to delete this nweet?");

    if(ok) {
      // delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  }
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false); 
  };
  const onChange = async (event) => {
    const  {
      target: { value },
    } = event;
    await setNewNweet(value)
  }
  return (
    <div>
      {editing ? 
      <>
        {isOwner && 
        <>
          <form onSubmit={onSubmit}>
            <input 
              type="text" 
              placeholder="Edit your nweet" 
              value={newNweet} 
              required 
              onChange={onChange} 
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
        }
      </>
      :<>
        <h4>{nweetObj.text}</h4>
        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />  }
        {/* if you are owner for nweet, it is possible to delete and edit. */}
        { isOwner && 
        (
          <>
            <button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={toggleEditing}>Edit Nweet</button>
          </>
        )}
      </>
      }
    </div> 
  );
}

export default Nweet;