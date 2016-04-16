import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import FeedPage from './app/components/FeedPage'


const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  navTitle: {
    color: 'white',
  },
  routerScene: {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight, // some navbar padding to avoid content overlap
  },
})


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
                <Scene key="root" sceneStyle={styles.routerScene} navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} >
                    <Scene key="feedpage" component={FeedPage} title="FeedPage" initial={true} />
                </Scene>
            </Scene>
        </Router>;
    }
}