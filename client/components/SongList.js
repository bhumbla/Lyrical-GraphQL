import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';
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
      <ul className="collection">{this.renderSongs()}</ul>
    );
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);