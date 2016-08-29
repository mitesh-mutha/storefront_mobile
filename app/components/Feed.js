import React, {Component} from 'react';
import {ListView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from "react-native-router-flux";
import Share from "react-native-share";
import utility from './../utilities';
import Strings from './../strings';

var ImageProgress = require('react-native-image-progress');
var RNFS = require('react-native-fs');
var EntypoIcons = require('react-native-vector-icons/Entypo');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var MOCKED_FEED_ITEMS ={};

var Feed = React.createClass({
  getInitialState() {
    MOCKED_FEED_ITEMS['post111'] = {
      id: 111,
      type: 'post',
      text: 'Arnav jewellers are presenting at the C3P0 stall today. Please come visit us.',
      liked: false,
      seller: 'Arnav Jewllers'
    };
    MOCKED_FEED_ITEMS['product122'] = {
      id: 122,
      type: 'product',
      title: 'Product A',
      coverimg: 'https://s-media-cache-ak0.pinimg.com/736x/ce/22/9e/ce229e3fd9c839247b76332a7c081661.jpg',
      liked: false,
      wished: false,
      price: 2853,
      seller: 'Arnav Jewllers'
    };
    MOCKED_FEED_ITEMS['product123'] = {
      id: 123,
      type: 'product',
      title: 'Product B',
      coverimg: 'https://pcjeweller.files.wordpress.com/2013/07/designer-diamond-necklace.jpg',
      liked: false,
      wished: true,
      price: 2000,
      seller: 'Arnav Jewllers'
    };
    MOCKED_FEED_ITEMS['product125'] = {
      id: 125,
      type: 'product',
      title: 'Product C',
      coverimg: 'http://www.chintamanis.in/catalog/view/theme/pav_books/img/high_wedding_jewellery/jadau/jadau_necklace_highend_large.png',
      liked: true,
      wished: false,
      price: 2101,
      seller: 'Arnav Jewllers'
    };
    MOCKED_FEED_ITEMS['product128'] = {
      id: 128,
      type: 'product',
      title: 'Product D',
      coverimg: 'http://www.gemnjewelery.com/blog/wp-content/uploads/2015/12/image_3.jpg',
      liked: true,
      wished: true,
      price: 2812,
      seller: 'Arnav Jewllers'
    };
        
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
        
    return {
      dataSource: ds.cloneWithRows(MOCKED_FEED_ITEMS)
    }
  },

  componentDidMount() {
    if ( !this.props.phone || !this.props.authentication_token ) {
      utility.showAlertWithOK(Strings.NO_LOGIN_DETAILS, Strings.NO_LOGIN_DETAILS_MSG);
    }
  },

  likeFeedItem(itemid, itemtype) {
               
        MOCKED_FEED_ITEMS[itemtype + itemid.toString()].liked = true;
        
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.setState({ dataSource: ds.cloneWithRows(MOCKED_FEED_ITEMS) });
        return;
    },

    unlikeFeedItem(itemid, itemtype) {
               
        MOCKED_FEED_ITEMS[itemtype + itemid.toString()].liked = false;
        
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.setState({ dataSource: ds.cloneWithRows(MOCKED_FEED_ITEMS) });
        return;
    },

    renderLikeButton(liked, itemid, itemtype) {
        if (liked) {
            return (
              <TouchableOpacity style={styles.actionButton} onPress={()=>this.unlikeFeedItem(itemid, itemtype)}>
                    <EntypoIcons name="heart" size={24} color='red' />
                </TouchableOpacity>
                
            )
        }
        else {
            return (
              <TouchableOpacity style={styles.actionButton} onPress={()=>this.likeFeedItem(itemid, itemtype)}>
                    <EntypoIcons name="heart-outlined" size={24} />
                </TouchableOpacity>
                
            )
        }
    },

    renderWishlistButton(wished, itemid, itemtype) {
        if (wished) {
            return (
                <TouchableOpacity style={styles.actionButton}>
                    <MaterialIcons name="remove-shopping-cart" size={24}/>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.actionButton}>
                    <MaterialIcons name="add-shopping-cart" size={24} />
                </TouchableOpacity>
            )
        }
    },

    uploadProgress(response) {
      if (response.contentLength == response.bytesWritten) {
        
      } 
      console.log("progress is "+response.bytesWritten+"/"+response.contentLength); 
    },

    onShare(imgLink, imgText) {
      if (!imgLink) {
        Share.open({
          share_text: imgText,
          share_URL: "http://storefront.com",
          title: "Share Product"
        },(e) => {
          console.log(e);
        });
        return;
      }

      this.setState({shareSpinnerVisible: true});

      RNFS.downloadFile({
        fromUrl: imgLink,
        toFile: RNFS.ExternalDirectoryPath+"/share_image.jpg",
        progressDivider: 2,
        progress: this.uploadProgress
      }).then((downloadresult) => {
        
        Share.open({
          share_text: imgText+". Find more products on Storefront.",
          share_URL: "http://storefront.com",
          share_image_path: RNFS.ExternalDirectoryPath+"/share_image.jpg",
          title: "Share Product"
        },(e) => {
          console.log(e);
        });

      })
      .catch((err) => {
        console.log(err.message);
      });
    },

    renderShareButton(shareImageLink, shareImageText) {
      return (
          <TouchableOpacity style={styles.actionButton} onPress={() => this.onShare(shareImageLink, shareImageText)}>
            <MaterialIcons name="share" size={24} />
          </TouchableOpacity>
        )
    },

  renderPostFeedItem(feeditem) {
    return(
      <View style={styles.postFeedItem}>

        <TouchableOpacity style={styles.sellerContainer} onPress={()=>Actions.vendorpage()}>
          <Image style={styles.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
          <View style={styles.detailContainer}>
            <Text style={styles.sellerName}>{feeditem.seller}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.postTextContainer}>
          <Text style={styles.postText}>{feeditem.text}</Text>
        </View>

        <View style={styles.actionButtonContainer}>
          {this.renderLikeButton(feeditem.liked, feeditem.id, feeditem.type)}
          {this.renderShareButton(null, feeditem.text+" - "+feeditem.seller)}
        </View>
      </View>
    );
  },

  renderProductFeedItem(feeditem) {
    return(
      <View style={styles.productFeedItem} >

        <TouchableOpacity style={styles.sellerContainer} onPress={()=>Actions.vendorpage()}>
          <Image style={styles.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
          <View style={styles.detailContainer}>
            <Text style={styles.sellerName}>{feeditem.seller}</Text>
            <Text style={styles.productName}>{feeditem.title}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems:'center', alignSelf: 'center'}} 
          onPress={
            ()=>Actions.productpage({
              'productId':1,
              'phone': this.props.phone,
              'authentication_token': this.props.authentication_token
            })
          } 
        >
            <ImageProgress source={{uri : feeditem.coverimg}} style={styles.feedImageStyle} />
        </TouchableOpacity>

        <View style={styles.actionButtonContainer}>
          {this.renderLikeButton(feeditem.liked, feeditem.id, feeditem.type)}
          {this.renderWishlistButton(feeditem.wished, feeditem.id, feeditem.type)}
          {this.renderShareButton(feeditem.coverimg, feeditem.title+" - "+feeditem.seller)}
        </View>


      </View>
    );
  },

  _renderRow (feeditem) {
    if (feeditem.type == 'product') {
      return this.renderProductFeedItem(feeditem);
    }
    else if (feeditem.type == 'post') {
      return this.renderPostFeedItem(feeditem);
    }
    else {
      // If we are here there is a problem
    }
  },
    
  render() {
    return (          
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this._renderRow} />
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  productFeedItem: {
    flex: 1,
    marginBottom: 36    
  },
  postFeedItem: {
    marginBottom: 36
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8
  },
  detailContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 8,
    paddingLeft: 8
  },
  sellerAvatar: {
    height: 32,
    borderRadius: 16,
    width: 32
  },
  sellerName: {  
    fontFamily: 'HelveticaNeueMedium',
    color: 'black'
  },
  productName: {
    fontFamily: 'HelveticaNeueLight'
  },
  feedImageStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 260,
    alignSelf: 'center'
  },
  actionButtonContainer: {
    marginLeft: 8,
    marginRight: 8,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderStyle:'solid',
    borderBottomWidth:1,
    borderBottomColor: 'rgba(79, 79, 79, 0.1)'
  },
  postTextContainer: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom:8,
    flexDirection:'column',
    flexWrap: 'nowrap'
  },
  postText: {
    fontFamily: 'HelveticaNeueLight'
  },
  actionButton: {
    padding: 8
  }
});

module.exports = Feed;