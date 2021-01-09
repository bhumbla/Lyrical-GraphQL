import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';

const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache(
    {
      typePolicies: {
         Query: {
           fields: {
             songs: {
               merge (existing = [], incoming) {
                 return [...incoming];
               }
             }
           }
         }
      }
    }
  )
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Route exact path="/" component={SongList}/>
        <Route exact path="/songs/new" component={SongCreate}/>
      </HashRouter>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
