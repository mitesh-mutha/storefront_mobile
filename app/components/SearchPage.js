import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, ScrollView, TextInput, ListView, TouchableOpacity} from 'react-native';
import Footer from "./Footer";
import {Actions} from "react-native-router-flux";
import utility from './../utilities';
import Strings from './../strings';
import URL from './../urls';
import Spinner from 'react-native-loading-spinner-overlay';

var ImageProgress = require('react-native-image-progress');
var Ionicons = require('react-native-vector-icons/Ionicons');

var SEARCH_ITEM ={};

var SearchPage  = React.createClass({
    getInitialState() {        
        return {
            dataSource: null,
            searchString: "",
            spinnerVisible: false
        }
    },

    componentDidMount() {
        this.fetchSearchResults("");
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
            utility.showAlertWithOK("Error", "Response Code: "+response.status);
            return null;
          }
        })
        .then((responseJson) => {
            if (responseJson === null)
              return;
            
            this.setState({spinnerVisible: false});

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
            utility.showAlertWithOK("Error", "Response Code: "+response.status);
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

  renderSearchResults() {
    if ( this.state.dataSource !== null ) {
      return (
        <View>
          <View style={styles.resultsHeadingContainer}>
            <Text style={styles.resultsHeadingText}>    Search Results    </Text>
          </View>
          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this._renderRow} />
        </View>
      )
    }    
  },

  updateListDataSource() {
    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
    });
    this.setState({ dataSource: ds.cloneWithRows(SEARCH_ITEM) });
  },

  fetchSearchResults(searchText) {
    url = URL.API_URL.SELLER_SEARCH_URL+"?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token+"&"+
            "q="+searchText;

        this.setState({spinnerVisible: true});

        fetch(url,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({spinnerVisible: false});
            this.refs.SearchInput.focus();
            if ( responseJson.status && responseJson.status === "success") {
        
                SEARCH_ITEM ={};
                for (i=0;i<responseJson.sellers.length;i++) {
                    SEARCH_ITEM[responseJson.sellers[i].id] = responseJson.sellers[i]; // TODO:Change to id
                }

                this.updateListDataSource();

            }
            else if ( responseJson.status && responseJson.status === "Unauthenticated") {
                utility.showAlertWithOK("Error", "Unauthenticated");
            }
        })
        .catch((error) =>  {
            this.setState({spinnerVisible: false});
            this.refs.SearchInput.focus();
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
  },

  onSearchTextChange(text) {
    this.setState({searchString: text});
    this.fetchSearchResults(text);
  },

  render(){
    return (
      <View style={styles.container}>
        
        <View style={styles.header}>
          <View style={styles.searchHeader}>
              <Ionicons name="md-search" size={20} />
              <TextInput
                ref="SearchInput"
                placeholder="Seller Search"
                style={styles.searchInput}
                onChangeText={(text) => this.onSearchTextChange(text)}
                value={this.state.searchString}/>
          </View>  
        </View>

        <Spinner visible={this.state.spinnerVisible} />
        <ScrollView style={styles.scrollContainer}  keyboardShouldPersistTaps={true} >
          {this.renderSearchResults()}
        </ScrollView>
        
        <Footer page='search' phone={this.props.phone} authentication_token={this.props.authentication_token}/>

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
    marginBottom: 8,
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
  },
  resultsHeadingContainer: {
    alignSelf:'center', 
    marginTop:8
  },
  resultsHeadingText: {
    flex:1, 
    marginTop: 8
  },
  searchHeader: {
    flex:1,
    margin: 16,
    flexDirection: 'row',
    flexWrap: "nowrap",
    alignItems: "center"
  },
  searchInput: {
    height: 40, 
    flex: 1
  },
  scrollContainer: {
    flex:1
  }
});

module.exports = SearchPage;