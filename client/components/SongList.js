import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Link } from 'react-router-dom';
import fetchSongs from '../queries/fetchSongs';
class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">{song.title}</li>
      )
    })
  }

  render() {
    console.log(this.props);

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

export default graphql(fetchSongs)(SongList);