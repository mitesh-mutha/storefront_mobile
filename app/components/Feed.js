import React, {ListView, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import Dimensions from 'Dimensions';

var EntypoIcons = require('react-native-vector-icons/Entypo');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var MOCKED_FEED_ITEMS ={};

const style = StyleSheet.create({
  productFeedItem: {
    flex: 1,
    marginBottom: 36    
  },
  postFeedItem: {
    flex: 1,
    marginBottom: 36    
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
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
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
  actionButton: {
    padding: 8
  }
});

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
              <TouchableOpacity style={style.actionButton} onPress={()=>this.unlikeFeedItem(itemid, itemtype)}>
                    <EntypoIcons name="heart" size={24} color='red' />
                </TouchableOpacity>
                
            )
        }
        else {
            return (
              <TouchableOpacity style={style.actionButton} onPress={()=>this.likeFeedItem(itemid, itemtype)}>
                    <EntypoIcons name="heart-outlined" size={24} />
                </TouchableOpacity>
                
            )
        }
    },

    renderWishlistButton(wished, itemid, itemtype) {
        if (wished) {
            return (
                <TouchableOpacity style={style.actionButton}>
                    <MaterialIcons name="remove-shopping-cart" size={24}/>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={style.actionButton}>
                    <MaterialIcons name="add-shopping-cart" size={24} />
                </TouchableOpacity>
            )
        }
    },

    renderShareButton() {
      return (
          <TouchableOpacity style={style.actionButton}>
            <MaterialIcons name="share" size={24} />
          </TouchableOpacity>
        )
    },

  renderPostFeedItem(feeditem) {
    return(
      <View style={style.postFeedItem}>

        <TouchableOpacity style={style.sellerContainer} onPress={()=>Actions.vendorpage()}>
          <Image style={style.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
          <View style={style.detailContainer}>
            <Text style={style.sellerName}>{feeditem.seller}</Text>
          </View>
        </TouchableOpacity>

        <View style={[style.actionButtonContainer,{flexDirection:'column', borderBottomWidth:0, marginBottom:8}]}>
          <Text style={style.productName}>{feeditem.text}</Text>
        </View>

        <View style={style.actionButtonContainer}>
          {this.renderLikeButton(feeditem.liked, feeditem.id, feeditem.type)}
          {this.renderShareButton()}
        </View>



      </View>
    );
  },

  renderProductFeedItem(feeditem) {
    return(
      <View style={style.productFeedItem} >

        <TouchableOpacity style={style.sellerContainer} onPress={()=>Actions.vendorpage()}>
          <Image style={style.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
          <View style={style.detailContainer}>
            <Text style={style.sellerName}>{feeditem.seller}</Text>
            <Text style={style.productName}>{feeditem.title}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems:'flex-start', alignSelf: 'flex-start'}} onPress={()=>Actions.productpage({productId:feeditem.id})} >
            <Image source={{uri : feeditem.coverimg}} style={style.feedImageStyle}/>
        </TouchableOpacity>

        <View style={style.actionButtonContainer}>
          {this.renderLikeButton(feeditem.liked, feeditem.id, feeditem.type)}
          {this.renderWishlistButton(feeditem.wished, feeditem.id, feeditem.type)}
          {this.renderShareButton()}
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

module.exports = Feed;