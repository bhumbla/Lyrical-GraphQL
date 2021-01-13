import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import query from '../queries/fetchSongs';

const ADD_SONG = gql(`
mutation AddSong($title: String){
  addSong(title: $title) {
     title
   }
 }
`);

const SongCreate = (props) => {
  const [title, setTitle] = useState('');
  const [addSong] = useMutation(ADD_SONG, {
    refetchQueries: [{ query }],
    onCompleted: () => {
      props.history.push('/');
    }
  })

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        addSong({
          variables: {
            title: title
          }
        })
      }
      }>
        <label>Song Title: </label>
        <input
          onChange={event => setTitle(event.target.value)}
          value={title}
        />
      </form>
    </div>
  )
}

export default SongCreate;
