import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, ListView, Image, TouchableHighlight} from 'react-native';
import {Actions} from "react-native-router-flux";
import Footer from "./Footer";
import Dimensions from 'Dimensions';
import Spinner from 'react-native-loading-spinner-overlay';
import Share from "react-native-share";
import utility from './../utilities';
import Strings from './../strings';
import URL from './../urls';

var ImageProgress = require('react-native-image-progress');
var RNFS = require('react-native-fs');
var EntypoIcons = require('react-native-vector-icons/Entypo');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');

var WISHLISTED_ITEMS = {};

var WishlistPage  = React.createClass({

    getInitialState() {
        return ({
            dataSource: null,
            spinnerVisible: false
        });
    },

    componentDidMount() {
        url = URL.API_URL.CUSTOMER_WISHLISTED_PRODUCTS_URL+"?"+
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
                
                WISHLISTED_ITEMS ={};
                for (i=0;i<responseJson.products.length;i++) {
                    WISHLISTED_ITEMS[responseJson.products[i].id] = responseJson.products[i];
                }

                var ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 != r2
                });
                this.setState({ dataSource: ds.cloneWithRows(WISHLISTED_ITEMS) });

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

    likeFeedItem(itemid, itemtype) {
        url = URL.API_URL.CUSTOMER_WISHLISTED_PRODUCTS_URL+"?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                WISHLISTED_ITEMS[itemid].liked = true;
                var ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 != r2
                });
                this.setState({ dataSource: ds.cloneWithRows(WISHLISTED_ITEMS) });
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });

        return;
    },

    unlikeFeedItem(itemid, itemtype) {
        url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/unlike?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                WISHLISTED_ITEMS[itemid].liked = false;
                var ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 != r2
                });
                this.setState({ dataSource: ds.cloneWithRows(WISHLISTED_ITEMS) });
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
        return;
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
        
            this.setState({shareSpinnerVisible: false});
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
            this.setState({shareSpinnerVisible: false});
            console.log(err.message);
        });
    },

    wishlistFeedItem(itemid) {
        url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/wishlist?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                FEED_PRODUCT_ITEMS[itemid].wishlisted = true;
                var ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 != r2
                });
                this.setState({ dataSource: ds.cloneWithRows(FEED_PRODUCT_ITEMS) });
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
        return;
    },

    unwishlistFeedItem(itemid) {
        url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/unwishlist?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                FEED_PRODUCT_ITEMS[itemid].wishlisted = false;
                var ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 != r2
                });
                this.setState({ dataSource: ds.cloneWithRows(FEED_PRODUCT_ITEMS) });
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
        return;
    },

    renderWishlistButton(wished, itemid, itemtype) {
        if (wished) {
            return (
                <TouchableOpacity style={styles.actionButton} onPress={()=>this.unwishlistFeedItem(itemid)}>
                    <MaterialIcons name="remove-shopping-cart" size={24}/>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.actionButton} onPress={()=>this.wishlistFeedItem(itemid)}>
                    <MaterialIcons name="add-shopping-cart" size={24} />
                </TouchableOpacity>
            )
        }
    },

    renderLikeButton(liked, itemid) {
        if (liked) {
            return (
                <TouchableOpacity style={styles.actionButton} onPress={()=>this.unlikeFeedItem(itemid)}>
                    <EntypoIcons name="heart" size={24} color='red' />
                </TouchableOpacity>                
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.actionButton} onPress={()=>this.likeFeedItem(itemid)}>
                    <EntypoIcons name="heart-outlined" size={24} />
                </TouchableOpacity>
            )
        }
    },

    renderShareButton(shareImageLink, shareImageText) {
        return (
            <TouchableOpacity style={styles.actionButton} onPress={() => this.onShare(shareImageLink, shareImageText)}>
                <MaterialIcons name="share" size={24} />
            </TouchableOpacity>
        )
    },

    _renderRow(feeditem) {
        if (!feeditem.seller.logo || feeditem.seller.logo === "") {
            index = feeditem.seller.name.indexOf(' ');
            if (index >= 0 && (index+1) < feeditem.seller.name.length ) {
                initials =  feeditem.seller.name.charAt(0) + feeditem.seller.name.charAt(index+1);
            }
            else if ( feeditem.seller.name.length >= 2 ) {
                initials = feeditem.seller.name.charAt(0)+feeditem.seller.name.charAt(1)
            }
            else {
                initials = " "
            }
            seller_logo_url = "https://placeholdit.imgix.net/~text?txtsize=16&bg=000000&txtclr=ffffff&txt="+initials+"&w=32&h=32&txttrack=0&txtpad=1"
        }
        else {
            seller_logo_url = feeditem.seller.logo
        }

        //img_height = Math.ceil((Dimensions.get('window').width/feeditem.aspect_ratio));
        img_height = 450;

        return(
            <View style={styles.productFeedItem} >

                <View style={styles.sellerContainer}>
                    <Image style={styles.sellerAvatar} source={{uri: seller_logo_url}}/>
                    <View style={styles.detailContainer}>
                        <Text style={styles.sellerName}>{feeditem.seller.name}</Text>
                        <Text style={styles.productName}>{feeditem.name}</Text>
                    </View>
                </View>

                <TouchableHighlight style={{alignItems:'center', alignSelf: 'center'}} 
                    onPress={()=>Actions.productpage({
                        'product': feeditem,
                        'phone': this.props.phone,
                        'authentication_token': this.props.authentication_token})}>
                    <ImageProgress source={{uri : URL.IMAGES_BASE_URL+feeditem.images[0].url}} 
                        style={[styles.feedImageStyle,{height: img_height}]} />
                </TouchableHighlight>

                <View style={styles.actionButtonContainer}>
                    {this.renderLikeButton(feeditem.liked, feeditem.id)}
                    {this.renderWishlistButton(feeditem.wishlisted, feeditem.id)}
                    {this.renderShareButton(URL.IMAGES_BASE_URL+feeditem.images[0].url, feeditem.name+" - "+feeditem.seller.name)}
                </View>
            </View>
        )
    },

    renderListView() {
        if (this.state.dataSource !== null) {
            return(
                <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {this._renderRow} />
                );
            }
        else {
            return;
        }
    },

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.appNameContainer}>
                        <Text style={styles.appName}>Storefront</Text>
                    </View>
                </View>

                <Spinner visible={this.state.spinnerVisible} />
                
                <ScrollView>
                    {this.renderListView()}
                </ScrollView>

                <Footer page='wishlist' phone={this.props.phone} authentication_token={this.props.authentication_token} />
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
    productFeedItem: {
        flex: 1,
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
            height: 300,
        alignSelf: 'center',
        resizeMode: 'contain'
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

module.exports = WishlistPage;