import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import FeedPage from './app/components/FeedPage'
import ProductPage from './app/components/ProductPage'
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
    height: 40
  },
  navTitle: {
    color: 'grey'
  },
  routerScene: {
    paddingTop: 8//Navigator.NavigationBar.Styles.General.NavBarHeight, // some navbar padding to avoid content overlap
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
        return <Router createReducer={reducerCreate} sceneStyle={styles.routerScene} navigationBarStyle={{height:48, backgroundColor: 'rgba(35, 35, 35, 1)',padding:0,alignItems:'center',flexDirection:'row',margin:0}} titleStyle={{color:'white', alignSelf:'flex-start',marginTop:-18,paddingTop:0, fontSize:24,backgroundColor:'transparent'}}>
            <Scene key="modal" component={Modal} >
                <Scene key="root">
                    <Scene key="feedpage" component={FeedPage} title="FeedPage" initial={true} />
                    <Scene key="productpage" component={ProductPage} title="ProductPage" panHandlers={null} />
                </Scene>
            </Scene>
        </Router>;
    }
}