import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'

import FeedPage from './app/components/FeedPage'
import ProductPage from './app/components/ProductPage'

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
        </Scene>
      </Scene>
    </Router>;
  }
}