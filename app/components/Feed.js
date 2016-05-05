import React, {ListView, View, Text, StyleSheet, ScrollView, Image, TouchableHighlight} from "react-native";
import {
  MKButton,
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';
// var Icon = require('react-native-vector-icons/FontAwesome');

const theme = getTheme();

const style = StyleSheet.create({
    feedItemStyle: {
        margin:10,
        marginBottom:20
    },
    feedItemCardStyle: theme.cardStyle,
    sellerNameStyle: {
        borderStyle: 'solid',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1,
        padding: 15,
    },
    feedImageStyle: {
        flex:1,
        resizeMode:'contain', 
        height:200
    },
    sellerNameTextStyle: {
        fontWeight: 'bold',
        fontSize: 14
    },
    itemNameStyle: {
        padding: 15
    },
    itemNameTextStyle: {
        padding: 15,
        color: 'rgba(0, 0, 0, 0.54)',
        padding:0,
        fontWeight:'bold'
    },
    actionButtonContainerStyle: {
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1,
        padding: 15,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start'
    },
    actionButtonStyle: {
        flex: 1,
        alignSelf: 'stretch'
    }
});

var Feed = React.createClass({

    getInitialState() { 
        var MOCKED_FEED_ITEMS = [
            {
                type: 'product',
                title: 'Product A',
                coverimg: 'http://sourcingandbuying.in/Adminpanel/product_images/g1.jpg',
                liked: false,
                wished: false,
                price: 2853,
                seller: 'Arnav Jewllers'
            },
            {
                type: 'product',
                title: 'Product B',
                coverimg: 'http://sourcingandbuying.in/Adminpanel/product_images/g2.jpg',
                liked: false,
                wished: true,
                price: 2000,
                seller: 'Arnav Jewllers'
            },
            {
                type: 'product',
                title: 'Product C',
                coverimg: 'http://www.chintamanis.in/catalog/view/theme/pav_books/img/high_wedding_jewellery/jadau/jadau_necklace_highend_large.png',
                liked: true,
                wished: false,
                price: 2101,
                seller: 'Arnav Jewllers'
            },
            {
                type: 'product',
                title: 'Product D',
                coverimg: 'http://www.gemnjewelery.com/blog/wp-content/uploads/2015/12/image_3.jpg',
                liked: true,
                wished: true,
                price: 2812,
                seller: 'Arnav Jewllers'
            }
        ];
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        return {
            dataSource: ds.cloneWithRows(MOCKED_FEED_ITEMS)
        }
    },

    renderLikeButton(liked) {
        if (liked) {
            return (
                <TouchableHighlight style={style.actionButtonStyle}>
                    <Text>Unlike</Text>
                </TouchableHighlight>
            )
        }
        else {
            return (
                <TouchableHighlight style={style.actionButtonStyle}>
                    <Text>Like</Text>
                </TouchableHighlight>
            )
        }
    },

    renderWishlistButton(wished) {
        if (wished) {
            return (
                <TouchableHighlight style={style.actionButtonStyle}>
                    <Text>Wished</Text>
                </TouchableHighlight>
            )
        }
        else {
            return (
                <TouchableHighlight style={style.actionButtonStyle}>
                    <Text>Wish</Text>
                </TouchableHighlight>
            )
        }
    },

    renderShareButton() {
        return (
            <TouchableHighlight style={style.actionButtonStyle}>
                <Text>Share</Text>
            </TouchableHighlight>
        )
    },

    _renderRow (feeditem) {
        var base64Icon = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
        var action = (<Text> My action</Text>);
        return(
            <View style = {style.feedItemStyle}>
                <View style = {style.feedItemCardStyle}>
                    <View style = {style.sellerNameStyle}>
                        <Text style = {style.sellerNameTextStyle}>{feeditem.seller}</Text>
                    </View>
                    
                    <Image source={{uri : feeditem.coverimg}} style={style.feedImageStyle}/>

                    <View style={style.itemNameStyle}>
                        <Text style={style.itemNameTextStyle}>
                            {feeditem.title}
                        </Text>
                    </View>
                    
                    <View style={style.actionButtonContainerStyle}>
                        {this.renderLikeButton(feeditem.liked)}
                        {this.renderWishlistButton(feeditem.wished)}
                        {this.renderShareButton()}
                    </View>
                </View>
            </View>
        );
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