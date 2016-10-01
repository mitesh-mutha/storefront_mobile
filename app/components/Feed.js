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

var FEED_ITEMS = [];
var FEED_ITEMS_MAPPING = {};

var _lview;

var Feed = React.createClass({
    getInitialState() {        
        return {
            dataSource: null,
            spinnerVisible: false,
            shareSpinnerVisible: false,
            pageNumber: 1,
            appendingInProcess: false,
            feedTimestamp: Math.floor((new Date()).getTime() / 1000),
            showNewItemsBox: false
        }
    },

    updateFeedListViewSource() {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        //this.setState({ dataSource: ds.cloneWithRows([]) });
        this.setState({ dataSource: ds.cloneWithRows(FEED_ITEMS) });
    },

    getFeed() {
        url = URL.API_URL.CUSTOMER_FEED_URL+"?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token+"&"+
            "current_time="+this.state.feedTimestamp+
            "page="+this.state.pageNumber;

        this.setState({spinnerVisible: true});

        fetch(url,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if ( responseJson.status && responseJson.status === "success") {
        
                FEED_ITEMS = [];
                FEED_ITEMS_MAPPING ={};
                for (i=0;i<responseJson.products.length;i++) {
                    responseJson.products[i].type = "product";
                    FEED_ITEMS[i] = responseJson.products[i];
                    FEED_ITEMS_MAPPING["product"+responseJson.products[i].id] = i;
                }
                orig_items_length = FEED_ITEMS.length;
                for (i=0;i<responseJson.posts.length;i++) {
                    responseJson.posts[i].type = "post";
                    FEED_ITEMS[i+orig_items_length] = responseJson.posts[i];
                    FEED_ITEMS_MAPPING["post"+responseJson.posts[i].id] = i;
                }
                this.updateFeedListViewSource();
                if ( responseJson.new_products === true || responseJson.new_posts === true ) {
                    this.setState({showNewItemsBox: true});
                }
                this.setState({spinnerVisible: false});
            }
            else if ( responseJson.status && responseJson.status === "Unauthenticated") {
                this.setState({spinnerVisible: false});
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
        if (itemtype == 'product') 
            url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/like?"+
                "phone="+this.props.phone+"&"+
                "authentication_token="+this.props.authentication_token;
        else
            url = URL.API_URL.POST_ACTIONS_INITIAL_URL+itemid+"/like?"+
                "phone="+this.props.phone+"&"+
                "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                if (itemtype == 'product') {
                    FEED_ITEMS[FEED_ITEMS_MAPPING["product"+itemid]].liked = true;
                    this.updateFeedListViewSource();
                }
                if (itemtype == 'post') {
                    FEED_ITEMS[FEED_ITEMS_MAPPING["post"+itemid]].liked = true;
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
        if (itemtype == 'product')
            url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/unlike?"+
                "phone="+this.props.phone+"&"+
                "authentication_token="+this.props.authentication_token;
        else
            url = URL.API_URL.POST_ACTIONS_INITIAL_URL+itemid+"/unlike?"+
                "phone="+this.props.phone+"&"+
                "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                if (itemtype == 'product') {
                    FEED_ITEMS[FEED_ITEMS_MAPPING["product"+itemid]].liked = false;
                    this.updateFeedListViewSource();
                }
                if (itemtype == 'post') {
                    FEED_ITEMS[FEED_ITEMS_MAPPING["post"+itemid]].liked = false;
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
                FEED_ITEMS[FEED_ITEMS_MAPPING["product"+itemid]].wishlisted = true;
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
                FEED_ITEMS[FEED_ITEMS_MAPPING["product"+itemid]].wishlisted = false;
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
        seller_logo_url = utility.getSellerLogoUrl(feeditem.seller.name, feeditem.seller.logo);
        img_height = Dimensions.get('window').width/feeditem.aspect_ratio;
        return(
            <View style={styles.postFeedItem}>

                <TouchableOpacity style={styles.sellerContainer} onPress={()=>Actions.vendorpage({
                    'seller_id': feeditem.seller.id,
                    'phone': this.props.phone,
                    'authentication_token': this.props.authentication_token
                })}>
                    <Image style={styles.sellerAvatar} source={{uri: seller_logo_url}}/>
                    <View style={styles.detailContainer}>
                        <Text style={styles.sellerName}>{feeditem.seller.name}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postText}>{feeditem.description}</Text>
                </View>
                <ImageProgress source={{uri : URL.IMAGES_BASE_URL+feeditem.images[0].url}} 
                        style={[styles.feedImageStyle,{height: img_height}]} />

                <View style={styles.actionButtonContainer}>
                    {this.renderLikeButton(feeditem.liked, feeditem.id, feeditem.type)}
                    {this.renderShareButton(feeditem.type, feeditem.id, null, feeditem.text+" - "+feeditem.seller)}
                </View>
            </View>
        );
    },

    renderProductFeedItem(feeditem) {
        
        seller_logo_url = utility.getSellerLogoUrl(feeditem.seller.name, feeditem.seller.logo);
        img_height = Dimensions.get('window').width/feeditem.aspect_ratio;
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
            return (
                <View>
                </View>
            );
        }
    },

    appendDataToList() {
        if (!this.state.appendingInProcess) {
            this.setState({appendingInProcess: true});
            this.props.loadingFunc(true);
            currentPage = this.state.pageNumber + 1;
            
            url = URL.API_URL.CUSTOMER_FEED_URL+"?"+
                "phone="+this.props.phone+"&"+
                "authentication_token="+this.props.authentication_token+"&"+
                "page="+currentPage+"&"+
                "current_time="+this.state.feedTimestamp;

            //utility.showAlertWithOK("URL","page="+currentPage+"&"+"current_time="+this.state.feedTimestamp);

            fetch(url,{
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
                
                if ( responseJson.status && responseJson.status === "success") {
                    feed_changed = false;
                    if (responseJson.products.length != 0) {
                        
                        orig_items_length = FEED_ITEMS.length;
                        for (i=0;i<responseJson.products.length;i++) {
                            responseJson.products[i].type = "product";
                            if ( responseJson.products[i].id in FEED_ITEMS_MAPPING ) {
                                FEED_ITEMS[FEED_ITEMS_MAPPING["product"+responseJson.products[i].id]] = responseJson.products[i];
                            }
                            else {
                                FEED_ITEMS[(orig_items_length+i)] = responseJson.products[i];
                                FEED_ITEMS_MAPPING["product"+responseJson.products[i].id] = (orig_items_length+i);    
                            }                            
                        }
                        feed_changed = true;
                    }

                    if (responseJson.posts.length != 0) { 
                        orig_items_length = FEED_ITEMS.length;
                        for (i=0;i<responseJson.posts.length;i++) {
                            responseJson.posts[i].type = "post";
                            if ( responseJson.posts[i].id in FEED_ITEMS_MAPPING ) {
                                FEED_ITEMS[FEED_ITEMS_MAPPING["post"+responseJson.posts[i].id]] = responseJson.posts[i];
                            }
                            else {
                                FEED_ITEMS[(orig_items_length+i)] = responseJson.posts[i];
                                FEED_ITEMS_MAPPING["post"+responseJson.posts[i].id] = (orig_items_length+i);    
                            }                            
                        }
                        feed_changed = true;
                    }

                    if (feed_changed) {
                        this.updateFeedListViewSource();
                        this.setState({pageNumber: currentPage});    
                    }                    

                    if ( responseJson.new_products == true || responseJson.new_posts == true ) {
                        this.setState({showNewItemsBox: true});
                    }
                    else {
                    }
                }
                else if ( responseJson.status && responseJson.status === "Unauthenticated") {
                    utility.showAlertWithOK("Error", "Unauthenticated");
                }
                this.setState({appendingInProcess: false});
                this.props.loadingFunc(false);                
            })
            .catch((error) =>  {
                utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
                this.setState({appendingInProcess: false});
                this.props.loadingFunc(false);
            });
        }
    },

    _onEndReached() {
        this.appendDataToList();
    },

    onNewItemsBoxClicked() {
        if (_lview) {
            _lview.scrollTo({y: 0, animated: true});
        }
        this.setState({feedTimestamp: Math.floor((new Date()).getTime() / 1000), pageNumber: 1, showNewItemsBox: false}, function(){
            this.getFeed();    
        });        
    },

    renderNewItemsBox() {
        if (this.state.showNewItemsBox) {
            return (
                <TouchableOpacity style={styles.newItemsBoxContainer} onPress={()=>this.onNewItemsBoxClicked()} >
                    <View style={styles.newItemsBox}>
                        <MaterialIcons name="arrow-upward" size={18} color={'white'}/>
                        <Text style={styles.newItemsText}>New Items</Text>
                    </View>                        
                </TouchableOpacity>
            );
        }
        else {
            return;
        }
    },
    
    render() {
        if (this.state.dataSource !== null) {
            return (          
                <View style={{flex:1}}>
                    <Spinner visible={this.state.spinnerVisible} />
                    <Spinner visible={this.state.shareSpinnerVisible} />
                    <ListView
                        style= {{flex:1}}
                        dataSource = {this.state.dataSource}
                        renderRow = {this._renderRow}
                        onEndReached = {this._onEndReached}
                        onEndReachedThreshold = {1500}
                        ref={(lview) => { _lview = lview; }} />
                    {this.renderNewItemsBox()}
                </View>
            );
        }
        else {
            return (          
                <View style={{flex:1}}>
                    <Spinner visible={this.state.spinnerVisible} />
                    <Spinner visible={this.state.shareSpinnerVisible} />
                </View>
            );
        }
    }
});

const styles = StyleSheet.create({
    productFeedItem: {
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
    },
    newItemsBoxContainer: { 
        position:'absolute', 
        top: 4, 
        right: 4, 
        alignItems: 'center', 
        flex: 1 
    },
    newItemsBox: {
        height: 24, 
        width: 116, 
        borderRadius: 12, 
        backgroundColor: '#1766f6', 
        alignItems: 'center', 
        flex:1, 
        justifyContent: 'center', 
        flexDirection: 'row', 
        flexWrap:'nowrap'
    },
    newItemsText: {
        fontFamily: 'HelveticaNeueMedium', 
        color:'white'
    }
});

module.exports = Feed;