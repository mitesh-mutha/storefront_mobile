import React, {Component} from 'react';
import {ListView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from "react-native-router-flux";
import Share from "react-native-share";
import utility from './../utilities';
import Strings from './../strings';
import URL from './../urls';
import Spinner from 'react-native-loading-spinner-overlay';

var ImageProgress = require('react-native-image-progress');
var RNFS = require('react-native-fs');
var EntypoIcons = require('react-native-vector-icons/Entypo');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var FEED_PRODUCT_ITEMS = {};

var Feed = React.createClass({
    getInitialState() {        
        return {
            dataSource: null,
            spinnerVisible: false,
            shareSpinnerVisible: false
        }
    },

    updateFeedListViewSource() {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.setState({ dataSource: ds.cloneWithRows(FEED_PRODUCT_ITEMS) });
    },

    getFeed() {
        url = URL.API_URL.CUSTOMER_FEED_URL+"?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token+"&"+
            "current_time="+Date.now();

        this.setState({spinnerVisible: true});

        fetch(url,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({spinnerVisible: false});
            if ( responseJson.status && responseJson.status === "success") {
        
                FEED_PRODUCT_ITEMS ={};
                for (i=0;i<responseJson.products.length;i++) {
                    responseJson.products[i].type = "product";
                    FEED_PRODUCT_ITEMS[responseJson.products[i].id] = responseJson.products[i];
                }

                this.updateFeedListViewSource();

            }
            else if ( responseJson.status && responseJson.status === "Unauthenticated") {
                utility.clearLoginDetails();
                utility.showAlertWithOK(Strings.ERROR, Strings.UNAUTHENTICATED);
            }
        })
        .catch((error) =>  {
            this.setState({spinnerVisible: false});
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
    },

    componentDidMount() {
        if ( !this.props.phone || !this.props.authentication_token ) {
            utility.showAlertWithOK(Strings.NO_LOGIN_DETAILS, Strings.NO_LOGIN_DETAILS_MSG);
        }

        this.getFeed();
    },

    likeFeedItem(itemid, itemtype) {
        url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/like?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                if (itemtype == 'product') {
                    FEED_PRODUCT_ITEMS[itemid].liked = true;
                    this.updateFeedListViewSource();
                }
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
                if (itemtype == 'product') {
                    FEED_PRODUCT_ITEMS[itemid].liked = false;
                    this.updateFeedListViewSource();
                }
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
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
                this.updateFeedListViewSource();
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
                this.updateFeedListViewSource();
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

    uploadProgress(response) {
    },

    onShare(itemtype, itemid, imgLink, imgText) {
        utility.informServerAboutShare(itemid, itemtype, this.props.phone, this.props.authentication_token);

        if (!imgLink) {
            Share.open({
                share_text: imgText,
                share_URL: "http://storefrontindia.com",
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
                share_URL: "http://storefrontindia.com",
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

    renderShareButton(itemtype, itemid, shareImageLink, shareImageText) {
        return (
            <TouchableOpacity style={styles.actionButton} onPress={() => this.onShare(itemtype, itemid, shareImageLink, shareImageText)}>
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
                    {this.renderShareButton(feeditem.type, feeditem.id, null, feeditem.text+" - "+feeditem.seller)}
                </View>
            </View>
        );
    },

    getSellerLogoUrl(feeditem) {
        if (!feeditem.seller.logo || feeditem.seller.logo === "") {
            index = feeditem.seller.name.indexOf(' ');
            if (index >= 0 && (index+1) < feeditem.seller.name.length ) {
                initials =  feeditem.seller.name.charAt(0) + feeditem.seller.name.charAt(index+1);
            }
            else if ( feeditem.seller.name.length >= 2 ) {
                initials = feeditem.seller.name.charAt(0)+feeditem.seller.name.charAt(1);
            }
            else {
                initials = " ";
            }
            initials = initials.toUpperCase();
            return "https://placeholdit.imgix.net/~text?txtsize=16&bg=000000&txtclr=ffffff&txt="+initials+"&w=32&h=32&txttrack=0&txtpad=1";
        }
        else {
            return feeditem.seller.logo;
        }
    },

    renderProductFeedItem(feeditem) {
        
        seller_logo_url = this.getSellerLogoUrl(feeditem);

        //img_height = Math.ceil((Dimensions.get('window').width/feeditem.aspect_ratio));
        img_height = 450;

        return(
            <View style={styles.productFeedItem} >

                <TouchableOpacity style={styles.sellerContainer} onPress={()=>Actions.vendorpage({
                    'seller_id': feeditem.seller.id,
                    'phone': this.props.phone,
                    'authentication_token': this.props.authentication_token
                })}>
                    <Image style={styles.sellerAvatar} source={{uri: seller_logo_url}}/>
                    <View style={styles.detailContainer}>
                        <Text style={styles.sellerName}>{feeditem.seller.name}</Text>
                        <Text style={styles.productName}>{feeditem.name}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableHighlight style={{alignItems:'center', alignSelf: 'center'}} 
                    onPress={()=>Actions.productpage({
                        'product_id': feeditem.id,
                        'phone': this.props.phone,
                        'authentication_token': this.props.authentication_token})}>
                    <ImageProgress source={{uri : URL.IMAGES_BASE_URL+feeditem.images[0].url}} 
                        style={[styles.feedImageStyle,{height: img_height}]} />
                </TouchableHighlight>

                <View style={styles.actionButtonContainer}>
                    {this.renderLikeButton(feeditem.liked, feeditem.id, feeditem.type)}
                    {this.renderWishlistButton(feeditem.wishlisted, feeditem.id, feeditem.type)}
                    {this.renderShareButton(feeditem.type, feeditem.id, URL.IMAGES_BASE_URL+feeditem.images[0].url, feeditem.name+" - "+feeditem.seller.name)}
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
        if (this.state.dataSource !== null) {
            return (          
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Spinner visible={this.state.spinnerVisible} />
                    <Spinner visible={this.state.shareSpinnerVisible} />
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {this._renderRow} />
                </ScrollView>
            );
        }
        else {
            return (          
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Spinner visible={this.state.spinnerVisible} />
                    <Spinner visible={this.state.shareSpinnerVisible} />
                </ScrollView>
            );
        }
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