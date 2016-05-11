import React, {ListView, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";

var EntypoIcons = require('react-native-vector-icons/Entypo');
var style = require('../styles/FeedStyles');
var MOCKED_FEED_ITEMS ={};

var Feed = React.createClass({

    getInitialState() { 
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

    unlikeFeedItem(itemid, itemtype) {
        
        MOCKED_FEED_ITEMS[itemtype + itemid.toString()].liked = false;
        
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.setState({ dataSource: ds.cloneWithRows(MOCKED_FEED_ITEMS) });
        return;
    },

    likeFeedItem(itemid, itemtype) {
               
        MOCKED_FEED_ITEMS[itemtype + itemid.toString()].liked = true;
        
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.setState({ dataSource: ds.cloneWithRows(MOCKED_FEED_ITEMS) });
        return;
    },

    renderLikeButton(liked, itemid, itemtype) {
        if (liked) {
            return (
                <TouchableOpacity style={style.actionButtonWithRightBorderStyle} onPress={()=>this.unlikeFeedItem(itemid, itemtype)}>
                    <Text style={style.actionTextStyle}><EntypoIcons name="heart-outlined" size={24} /></Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={style.actionButtonWithRightBorderStyle} onPress={()=>this.likeFeedItem(itemid, itemtype)}>
                    <Text style={style.actionTextStyle}><EntypoIcons name="heart" size={24} color='red' /></Text>
                </TouchableOpacity>
            )
        }
    },

    renderWishlistButton(wished) {
        if (wished) {
            return (
                <TouchableOpacity style={style.actionButtonWithRightBorderStyle}>
                    <Text style={style.actionTextStyle}>Wished</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={style.actionButtonWithRightBorderStyle}>
                    <Text style={style.actionTextStyle}>Wish</Text>
                </TouchableOpacity>
            )
        }
    },

    renderShareButton() {
        return (
            <TouchableOpacity style={style.actionButtonStyle}>
                <Text style={style.actionTextStyle}><EntypoIcons name="share" size={24} /></Text>
            </TouchableOpacity>
        )
    },

    renderPostFeedItem(feeditem) {
        return(
            <View style = {style.feedItemStyle}>
                <View style = {style.feedItemCardStyle}>
                </View>
            </View>
        );
    },

    renderProductFeedItem(feeditem) {
        return(
            <View style = {style.feedItemStyle}>
                {/* <View style = {style.feedItemCardStyle}> */}
                    <View style = {style.sellerNameStyle}>
                        <Text style = {style.sellerNameTextStyle}>{feeditem.seller}</Text>
                    </View>
                    
                    <TouchableOpacity onPress={()=>Actions.productpage({productId:feeditem.id})} >
                        <Image source={{uri : feeditem.coverimg}} style={style.feedImageStyle}/>
                    </TouchableOpacity>

                    
                    <View style={style.actionButtonContainerStyle}>
                        {this.renderLikeButton(feeditem.liked, feeditem.id, feeditem.type )}
                        {this.renderWishlistButton(feeditem.wished)}
                        {this.renderShareButton()}
                    </View>
                {/* </View> */}
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
            <ScrollView>
                <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {this._renderRow} />             
            </ScrollView>
        );
    }
});

module.exports = Feed;