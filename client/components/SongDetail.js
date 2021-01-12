import React from 'react';
import {useQuery}  from '@apollo/client';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

const SongDetail = (props) => {
  let id = props.match.params.id;
  const {data, loading, error} = useQuery(query, {
    variables: { id }
  });
  
  if(loading) return "Loading...";

  if(error) return error.message;

  if(!data || !data.song) return 'Song not found';

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Song Detail</h3>
      <p>{data.song.title}</p>
      <LyricList lyrics={data.song.lyrics}/>
      <LyricCreate songId={id}/>
    </div>
  )
}

export default SongDetail;
