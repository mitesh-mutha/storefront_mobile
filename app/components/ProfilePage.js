import React, {View, Text, StyleSheet, Navigator, ScrollView, Image, TouchableOpacity} from "react-native"
import Footer from "./Footer"
import {Actions} from "react-native-router-flux";

var MaterialIcons = require('react-native-vector-icons/MaterialIcons');

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
  appnamecontainer: {
    padding: 8,
    alignSelf: 'center'
  },
  appname: {
    fontSize: 18,
    fontFamily: 'HelveticaNeueMed',
    color: 'black'
  },
  sellerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 79, 79, 0.1)',
    paddingBottom: 8
  },
  sellerAvatar: {
    height: 88,
    borderRadius: 44,
    width: 88,
    marginTop:10,
    marginBottom:10
  },
  sellerName: {  
    fontFamily: 'HelveticaNeueMedium',
    color: 'black'
  },
  detailContainer: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 10
  }
});

var ProfilePage = React.createClass({
  getInitialState() {
    return {
      userName: 'Arjun Venugopal',
      userProfileImg: 'http://vignette2.wikia.nocookie.net/jamesbond/images/8/81/James_Bond_(Daniel_Craig)_-_Profile.jpg/revision/20150405210952',
      numLikedItems: 34,
      numWishlisted: 12,
      numFollowing: 40
    }
  },

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.appnamecontainer}>
            <Text style={styles.appname}>Storefront</Text>
          </View>
        </View>

        <ScrollView style={{flex:1}}>          

            <View style={styles.sellerContainer}>
              <View style={{marginLeft: 8, marginRight: 8, marginBottom: 8, alignItems:'center'}}>
                <Image style={styles.sellerAvatar} source={{uri: this.state.userProfileImg}}/>
                <Text style={styles.sellerName}>{this.state.userName}</Text>
              </View>
              <View style={styles.detailContainer}>                
                <View style={{flex:1, flexDirection:'row', alignItems:'stretch', marginTop:22 }}>
                  
                  <View style={{flex:1, alignItems:'center', margin: 4}}>
                    <Text style={{fontSize: 20, fontFamily: 'HelveticaNeueMedium', color: 'black'}}>{this.state.numLikedItems}</Text>
                    <Text style={{fontSize: 10}}>liked</Text>
                  </View>

                  <View style={{flex:1, alignItems:'center', margin: 4}}>
                    <Text style={{fontSize: 20, fontFamily: 'HelveticaNeueMedium', color: 'black'}}>{this.state.numWishlisted}</Text>
                    <Text style={{fontSize: 10}}>wishlisted</Text>
                  </View>

                  <View style={{flex:1, alignItems:'center', margin: 4}}>
                    <Text style={{fontSize: 20, fontFamily: 'HelveticaNeueMedium', color: 'black'}}>{this.state.numFollowing}</Text>
                    <Text style={{fontSize: 10}}>following</Text>
                  </View>

                </View>
              </View>
            </View>

            <TouchableOpacity style={{margin: 16, alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name='person-add' size={16} color='black' /><Text style={{color:'black', fontSize: 16, fontFamily:'HelveticaNeueMedium'}}>     Invite Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{margin: 16, alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center'}} onPress={()=>Actions.otploginpage()}>
              <MaterialIcons name='exit-to-app' size={16} color='black' /><Text style={{color:'black', fontSize: 16, fontFamily:'HelveticaNeueMedium'}}>      Log Out</Text>
            </TouchableOpacity>
          

        </ScrollView>

        
        <Footer page='profile'/>

      </View>
    );
  }
});

module.exports = ProfilePage;