import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'

import FeedPage from './app/components/FeedPage'
import ProductPage from './app/components/ProductPage'
import SearchPage from './app/components/SearchPage'
import FollowPage from './app/components/FollowPage'
import ProfilePage from './app/components/ProfilePage'

const reducerCreate = params=>{
  const defaultReducer = Reducer(params);
  return (state, action)=>{
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  }
};

export default class Storefront extends React.Component {
  render() {
    return <Router createReducer={reducerCreate}>
      <Scene key="modal" component={Modal} >
        <Scene key="root">
          <Scene key="feedpage" component={FeedPage} hideNavBar={true} initial={true} />
          <Scene key="productpage" component={ProductPage} hideNavBar={true} panHandlers={null} />
          <Scene key="searchpage" component={SearchPage} hideNavBar={true} />
          <Scene key="followpage" component={FollowPage} hideNavBar={true} />
          <Scene key="profilepage" component={ProfilePage} hideNavBar={true} />
        </Scene>
      </Scene>
    </Router>;
  }
}