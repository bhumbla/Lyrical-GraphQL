import React, {useState} from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($content:String, $songId:ID){
    addLyricToSong(content:$content, songId:$songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

const LyricCreate = (props) => {
  const [content, setLyric] = useState('');
  const [addLyric] = useMutation(ADD_LYRIC_TO_SONG, {
    update: () => {
      setLyric('');
    }
  });

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addLyric({
          variables: {
            content,
            songId: props.songId
          }
        })
      }}>
      <label>Add a Lyric</label>
      <input 
        value={content}
        onChange = {event => setLyric(event.target.value)}
      />
    </form>

  )
}

export default LyricCreate;
