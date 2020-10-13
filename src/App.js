import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Jobs from './Components/Jobs';
import JobDetails from './Components/JobDetails';
import Nav from './Components/Nav';
import './App.css';
import PostJob from './Components/PostJob';
import Footer from './Components/Footer';
import Home from './Components/Home';

const client = new ApolloClient({
  uri: 'https://api.graphql.jobs/'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post-job" component={PostJob} />
            <Route exact path="/job/:jobSlug/:companySlug" component={JobDetails} />
            <Route exact path="/:pageNo" component={Jobs} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
