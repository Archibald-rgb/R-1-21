import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '@pages/Home';

class Router extends Component {
  render() {
    const { chats } = this.props;
    const ChatsRoutes = chats.map((el) => <Route 
                                            exact path={`/chat/${el.id}`} 
                                            render = { ({ location }) => <Home name={ el.name } location={ location } id={ el.id }/> } 
                                            key = { el.id }
                                          />
                                        ) ;
    return (
      <Switch>
        <Route exact path="/" component = { Home } />
        { ChatsRoutes }
        {/* <Route exact path="/chat/1" render = { () => <Home name="Вася" /> } />
        <Route exact path="/chat/2" render = { () => <Home name="Клава" /> } />
        <Route exact path="/chat/3" render = { () => <Home name="Дуня" /> } />
        <Route exact path="/chat/4" render = { () => <Home name="Пердуня" /> } /> */}
        {/* <Route exact path="/not-home" render = { () => <div>This is not your Home. Get out!</div> } /> */}
      </Switch>
    );
  }
};

const mapState = ({ chatsReducer }) => ({
  chats: chatsReducer.chats
});

const mapActions = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapState, mapActions)(Router);
