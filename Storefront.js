import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import FeedPage from './app/components/FeedPage'
import { setTheme, MKColor } from 'react-native-material-kit';

// customize the material design theme
setTheme({
  primaryColor: MKColor.Purple,
  primaryColorRGB: MKColor.RGBPurple,
  accentColor: MKColor.Amber,
});

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  navTitle: {
    color: 'grey',
  },
  routerScene: {
    paddingTop: 10//Navigator.NavigationBar.Styles.General.NavBarHeight, // some navbar padding to avoid content overlap
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
        return <Router createReducer={reducerCreate} sceneStyle={styles.routerScene} navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
            <Scene key="modal" component={Modal} >
                <Scene key="root">
                    <Scene key="feedpage" component={FeedPage} title="FeedPage" initial={true} />
                </Scene>
            </Scene>
        </Router>;
    }
}