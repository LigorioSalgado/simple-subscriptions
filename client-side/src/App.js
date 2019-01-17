import React, { Component } from 'react';
import './App.css';
import FormComment from './FormComment';
import ListComments  from './ListComments';
import {ApolloProvider} from 'react-apollo';
import client from './Graphql';



class App extends Component {
  render() {
    return (
	<ApolloProvider client={client}>
      <div className="App">
		<FormComment/>
		<ListComments/>
      </div>
	</ApolloProvider>
    );
  }
}

export default App;
