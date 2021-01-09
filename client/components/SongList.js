import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';
class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }
  renderSongs() {
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i className="material-icons" 
            onClick={() => this.onSongDelete(id)}>delete</i>
        </li>
      )
    })
  }

  render() {
    return this.props.data.loading ? (<div> Loading... </div>) : (
      <div><ul className="collection">{this.renderSongs()}</ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const deleteSong = gql`
mutation DeleteSong($id: ID) {
  deleteSong (id:$id) {
    id
  }
}
`;

export default graphql(deleteSong)(
  graphql(query)(SongList)
);