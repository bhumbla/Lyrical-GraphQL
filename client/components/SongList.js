import React from 'react';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';
import {gql, useQuery, useMutation}  from '@apollo/client';

const DELETE_SONG = gql`
mutation DeleteSong($id: ID) {
  deleteSong (id:$id) {
    id
  }
}
`;

const renderSongs = () => {
  const {loading, error, data } = useQuery(query);
  const [deleteSongFn] = useMutation(DELETE_SONG, {
    refetchQueries: [{query}]
  });

  if(loading) return (<div>"Loading..."</div>);

  if(error) return error.message;

  if(!data || !data.songs) return 'Songs not found';

  return data.songs.map(({id, title}) => {
    return (
      <li key={id} className="collection-item">
      <Link to={`/songs/${id}`}>{title}</Link>
      <i className="material-icons" 
        onClick={() => deleteSongFn({variables: { id }})}>delete</i>
    </li> 
    )
  })
}

const SongList = () => {
  return (
    <div><ul className="collection">{renderSongs()}</ul>
      <Link
        to="/songs/new"
        className="btn-floating btn-large red right"
      >
        <i className="material-icons">add</i>
      </Link>
    </div>     
  )
}

export default SongList;
