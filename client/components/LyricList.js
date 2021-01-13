import React from 'react';
import { gql, useMutation } from '@apollo/client';

const LIKE_LYRIC = gql`
  mutation LikeLyric($id:ID) {
    likeLyric(id:$id) {
      id
      likes
    }
  }
`
const renderLyrics = (lyrics) => {
  const [likeLyric] = useMutation(LIKE_LYRIC);
  
  return lyrics.map(({ id, content, likes }) => {
  
    return (
      <li key={id} className="collection-item">
        {content}
        <span className="vote-box">
          <i className="material-icons"
            onClick={() => likeLyric({
              variables: { id },
              optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                  id: id,
                  __typename: 'LyricType',
                  likes: likes++
                }
              }
            })}>thumb_up</i>
          {likes}
        </span>
      </li>
    )
  });
}

const LyricList = (props) => {
  return (
    <ul className="collection">
      {renderLyrics(props.lyrics)}
    </ul>
  )
}
export default LyricList;
