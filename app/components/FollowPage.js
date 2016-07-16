import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, ScrollView, TextInput, Image, ListView, TouchableOpacity} from 'react-native';
import Footer from "./Footer"
import {Actions} from "react-native-router-flux";

var ImageProgress = require('react-native-image-progress');

var MOCKED_FOLLOW_ITEM ={};

const styles = StyleSheet.create({
  container: {
    flex: 1,        
    backgroundColor: "white",
  },
  header: {
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  appNameContainer: {
    padding: 8,
    alignSelf: 'center'
  },
  appName: {
    fontSize: 18,
    fontFamily: 'HelveticaNeueMed',
    color: 'black'
  },
  sellerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    marginLeft: 8
  },
  detailContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 8,
    paddingLeft: 8,
    flex:1,
    marginTop: 12
  },
  sellerAvatar: {
    height: 68,
    borderRadius: 34,
    width: 68,
    marginTop:10,
    marginBottom:10
  },
  sellerName: {  
    fontFamily: 'HelveticaNeueMedium',
    color: 'black',
    fontSize: 18
  },
  followItem: {
    flex:1,
    marginLeft:16,
    marginRight:16,
    marginTop: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.1)'
  },
  followingButtonContainer: {
    flex:1, 
    marginRight: 16, 
    marginTop:12, 
    marginBottom:8,
    borderStyle:'solid',
    borderColor:'rgba(0,0,0,0.1)',
    borderWidth:1, 
    borderRadius:5,
    alignItems:'center',
    alignSelf:'stretch',
    backgroundColor: 'green'
  },
  followingText: {
    flex:1, 
    marginTop:2,
    marginBottom: 2, 
    color:'white'
  },
  notFollowingButtonContainer: {
    flex:1, 
    marginRight: 16, 
    marginTop:12, 
    marginBottom:8,
    borderStyle:'solid',
    borderColor:'rgba(0,0,0,0.1)',
    borderWidth:1, 
    borderRadius:5,
    alignItems:'center',
    alignSelf:'stretch'
  },
  notFollowingText: {
    flex:1, 
    marginTop:2,
    marginBottom: 2, 
    color:'rgba(67, 164, 229, 1)'
  },
  followedVendorsContainer: {
    flex: 1
  }
});

var FollowPage = React.createClass({
  getInitialState() {
    MOCKED_FOLLOW_ITEM['vendor1'] = {
      id: 1,
      name: 'Arnav Jewellery',
      logourl: 'https://s-media-cache-ak0.pinimg.com/236x/58/80/1d/58801d3dcda64bc4d890e65bdcab8db7.jpg',
      isFollowing: true
    };

    MOCKED_FOLLOW_ITEM['vendor2'] = {
      id: 2,
      name: 'Geode Jewellery',
      logourl: 'https://s-media-cache-ak0.pinimg.com/236x/58/80/1d/58801d3dcda64bc4d890e65bdcab8db7.jpg',
      isFollowing: true
    };

    MOCKED_FOLLOW_ITEM['vendor3'] = {
      id: 3,
      name: 'Geode Jewellery',
      logourl: 'https://s-media-cache-ak0.pinimg.com/236x/58/80/1d/58801d3dcda64bc4d890e65bdcab8db7.jpg',
      isFollowing: true
    };

    MOCKED_FOLLOW_ITEM['vendor4'] = {
      id: 4,
      name: 'Geode Jewellery',
      logourl: 'https://s-media-cache-ak0.pinimg.com/236x/58/80/1d/58801d3dcda64bc4d890e65bdcab8db7.jpg',
      isFollowing: true
    };

    MOCKED_FOLLOW_ITEM['vendor5'] = {
      id: 5,
      name: 'Arnav Jewellery',
      logourl: 'https://s-media-cache-ak0.pinimg.com/236x/58/80/1d/58801d3dcda64bc4d890e65bdcab8db7.jpg',
      isFollowing: true
    };
        
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
        
    return {
      dataSource: ds.cloneWithRows(MOCKED_FOLLOW_ITEM)
    }
  },

  renderFollowButton(id, isFollowing) {
    if (isFollowing) {
      return (
        <View style={styles.followingButtonContainer}>
          <Text style={styles.followingText}>Following</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.notFollowingButtonContainer}>
          <Text style={styles.notFollowingText}>Follow</Text>
        </View>
      )
    }
  },

  _renderRow(resultItem)  {
    return (
      <TouchableOpacity style={styles.followItem} onPress={()=>Actions.vendorpage()}>
        <View style={styles.sellerContainer}>
          <ImageProgress style={styles.sellerAvatar} source={{uri: resultItem.logourl}}/>
          <View style={styles.detailContainer}>
            <Text style={styles.sellerName}>{resultItem.name}</Text>
            {this.renderFollowButton(resultItem.id, resultItem.isFollowing)}
          </View>
        </View>
      </TouchableOpacity>
    )
  },

  renderFollowedVendors(){
    return(
      <View>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this._renderRow} />
      </View>
    )
  },

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.appNameContainer}>
            <Text style={styles.appName}>Storefront</Text>
          </View>
        </View>

        <ScrollView style={styles.followedVendorsContainer}>
          {this.renderFollowedVendors()}
        </ScrollView>
        
        <Footer page='following'/>

      </View>
    );
  }
});

module.exports = FollowPage;