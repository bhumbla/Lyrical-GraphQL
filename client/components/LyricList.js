import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';

class LyricList extends Component {

  onLike(id, currentNumOfLikes) {
    console.log(id);

    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: currentNumOfLikes++
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map(({id, content, likes}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <span className="vote-box">
            <i className="material-icons" 
            onClick={() => this.onLike(id, likes)}>thumb_up</i>
            {likes}
          </span>
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id:ID) {
    likeLyric(id:$id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList);