import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, ScrollView, TextInput, Image, ListView, TouchableOpacity} from 'react-native';
import {Actions} from "react-native-router-flux";
import Footer from "./Footer";
import Spinner from 'react-native-loading-spinner-overlay';
import Strings from './../strings';
import URL from './../urls';
import utility from './../utilities';

var ImageProgress = require('react-native-image-progress');

var FOLLOW_ITEMS ={};

var FollowPage = React.createClass({
    getInitialState() {
      return {
            dataSource: null,
            spinnerVisible: false
        }
    },

    updateListDataSource() {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.setState({ dataSource: ds.cloneWithRows(FOLLOW_ITEMS) });
    },

    componentDidMount() {
        url = URL.API_URL.CUSTOMER_SELLERS_URL+"?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token+"&"+
            "page=1";

        this.setState({spinnerVisible: true});

        fetch(url,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({spinnerVisible: false});
            if ( responseJson.status && responseJson.status === "success") {
                
                FOLLOW_ITEMS ={};
                for (i=0;i<responseJson.sellers.length;i++) {
                    FOLLOW_ITEMS[responseJson.sellers[i].id] = responseJson.sellers[i]; // TODO:Change to id
                }

                this.updateListDataSource();

            }
            else if ( responseJson.status && responseJson.status === "Unauthenticated") {
                utility.showAlertWithOK("Error", "Unauthenticated");
            }
        })
        .catch((error) =>  {
            this.setState({spinnerVisible: false});
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
    },

    followSeller(id){
        url = URL.API_URL.SELLER_ACTIONS_INITIAL_URL + id + "/follow?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        this.setState({spinnerVisible: true}); 

        fetch(url,{
            method: 'POST'
        })
        .then((response) => {
          if(response.status === 200) {
            response.json();
          } else {
            utility.showAlertWithOK("Error", "Response "+response.status)
            return null;
          }
        })
        .then((responseJson) => {
            this.setState({spinnerVisible: false});

            if (responseJson === null)
              return;            

            if (responseJson.status === "success") {
                      SEARCH_ITEM[id].followed = true;        
                      this.updateListDataSource();
            }
            else {
              // TODO
            }
        })
        .catch((error) =>  {
            this.setState({spinnerVisible: false});
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
    },

    unfollowSeller(id) {
        url = URL.API_URL.SELLER_ACTIONS_INITIAL_URL + id + "/unfollow?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        this.setState({spinnerVisible: true}); 
        
        fetch(url,{
            method: 'POST'
        })
        .then((response) => {
          if(response.status === 200) {
            response.json();
          } else {
            utility.showAlertWithOK("Error", "Response "+response.status)
            return null;
          }
        })
        .then((responseJson) => {
            if (responseJson === null)
              return;
            
            this.setState({spinnerVisible: false});

            if (responseJson.status === "success") {
                SEARCH_ITEM[id].followed = false;        
                this.updateListDataSource();
            }
            else {
            }
        })
        .catch((error) =>  {
            this.setState({spinnerVisible: false});
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
    },

    renderFollowButton(id, isFollowing) {
        if (isFollowing) {
            return (
                <TouchableOpacity style={styles.followingButtonContainer} onPress={()=>this.unfollowSeller(id)}>
                    <Text style={styles.followingText}>Following</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.notFollowingButtonContainer} onPress={()=>this.followSeller(id)}>
                    <Text style={styles.notFollowingText}>Follow</Text>
                </TouchableOpacity>
            )
        }
    },

  _renderRow(resultItem)  {
    seller_logo_url = utility.getSellerLogoUrl(resultItem.name, resultItem.logo);

    return (
      <TouchableOpacity style={styles.followItem} onPress={()=>Actions.vendorpage({
            'seller_id': resultItem.id,
            'phone': this.props.phone,
            'authentication_token': this.props.authentication_token
        })}>
        <View style={styles.sellerContainer}>
          <ImageProgress style={styles.sellerAvatar} 
            source={{uri: seller_logo_url}} />
                <View style={styles.detailContainer}>
                        <Text style={styles.sellerName}>{resultItem.name}</Text>
                        {this.renderFollowButton(resultItem.id, resultItem.followed)}
                    </View>
                </View>
            </TouchableOpacity>
        )
    },

    renderFollowedVendors(){
        if (this.state.dataSource === null)
            return;
        
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
                        <Text style={styles.appName}>Sellers Following</Text>
                    </View>
                </View>

                <Spinner visible={this.state.spinnerVisible} />
                <ScrollView style={styles.followedVendorsContainer}>
                    {this.renderFollowedVendors()}
                </ScrollView>
            
                <Footer page='following' phone={this.props.phone} authentication_token={this.props.authentication_token}/>

            </View>
        );
    }
});

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

module.exports = FollowPage;