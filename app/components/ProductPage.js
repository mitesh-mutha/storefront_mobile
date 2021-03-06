import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from "react-native-router-flux";
import Share from "react-native-share";
import URL from './../urls';
import Spinner from 'react-native-loading-spinner-overlay';
import utility from './../utilities';
import Strings from './../strings';
import Footer from "./Footer"

var ImageProgress = require('react-native-image-progress');
var RNFS = require('react-native-fs');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var EntypoIcons = require('react-native-vector-icons/Entypo');

const CARD_PREVIEW_WIDTH = 60;
const CARD_MARGIN = 5;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 2;

var productDetails; 

var ProductPage = React.createClass({
    getInitialState() {
        
        if ( !this.props.phone || !this.props.authentication_token ) {
            utility.showAlertWithOK(Strings.NO_LOGIN_DETAILS, Strings.NO_LOGIN_DETAILS_MSG);
            return;
        }

        if ( !this.props.product_id  ) {
            utility.showAlertWithOK("Error", "No product details");
            return;
        }
        return {product: null, spinnerVisible:false, shareSpinnerVisible: false}
    },

    componentDidMount() {
        if (this.props.tracker){
            this.props.tracker.trackScreenView('ProductPage');
        }
        
        if ( !this.props.phone || !this.props.authentication_token ) {
            utility.showAlertWithOK(Strings.NO_LOGIN_DETAILS, Strings.NO_LOGIN_DETAILS_MSG);
            return;
        }

      
        url = URL.API_URL.PRODUCT_DETAILS_URL + this.props.product_id + "?"+
            "phone="+this.props.phone+
            "&authentication_token="+this.props.authentication_token;
      

        this.setState({spinnerVisible: true});

        fetch(url,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({spinnerVisible: false});

            if (responseJson.status === "success") {
                productDetails = responseJson.product;
                this.setState({
                    product: productDetails,
                    dataAvailable: true
                })
            }
            else if (responseJson.status === "Error") {
                utility.showAlertWithOK(Strings.NO_PRODUCT_DETAILS, Strings.NO_PRODUCT_DETAILS_MSG);
            }
        })
        .catch((error) =>  {
            this.setState({spinnerVisible: false});
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
            //utility.showAlertWithOK(Strings.REQUEST_FAILED, Strings.REQUEST_FAILED_MSG);
        });
    },

    unlikeFeedItem() {
        url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+this.state.product.id+"/unlike?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                productDetails.liked = false;
                this.setState({ product: productDetails });
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });

        this.props.tracker.trackEvent('ProductPage','Click - Unlike - Product',{label: ''+this.state.product.id});    
        return;
    },

    likeFeedItem() {
        url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+this.state.product.id+"/like?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                productDetails.liked = true;
                this.setState({ product: productDetails });
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
        this.props.tracker.trackEvent('ProductPage','Click - Like - Product',{label: ''+this.state.product.id});    
        return;
    },

    uploadProgress(response) {
      if (response.contentLength == response.bytesWritten) {
        
      } 
      console.log("progress is "+response.bytesWritten+"/"+response.contentLength); 
    },

    onShare(itemtype, itemid, imgLink, imgText) {
        utility.informServerAboutShare(itemid, itemtype, this.props.phone, this.props.authentication_token);
        this.props.tracker.trackEvent('ProductPage','Click - Share - Product',{label: ''+this.state.product.id});    

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
            <TouchableOpacity style={styles.actionButtonWithRightBorderStyle} onPress={() => this.onShare(itemtype, itemid, shareImageLink, shareImageText)}>
                <Text style={styles.actionTextStyle}><MaterialIcons name="share" size={24} /></Text>
            </TouchableOpacity>
        )
    },

    wishlistProduct(itemid) {
        url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/wishlist?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                productDetails.wishlisted = true;
                this.setState({ product: productDetails });
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
        this.props.tracker.trackEvent('ProductPage','Click - Wishlist',{label: ''+this.state.product.id});    
        return;
    },

    unwishlistProduct(itemid) {
        url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/unwishlist?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 'success') {
                productDetails.wishlisted = false;
                this.setState({ product: productDetails });
            }
        })
        .catch((error) =>  {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
        });
        this.props.tracker.trackEvent('ProductPage','Click - Unwishlist',{label: ''+this.state.product.id});    
        return;
    },

    renderWishlistButton() {
        if (!this.state.product)
            return;
        if (this.state.product.wishlisted) {
            return (
                <View style={styles.wishlistButtonContainer}>
                    <TouchableOpacity style={styles.wishedProductButton} onPress={()=>this.unwishlistProduct(this.state.product.id)}>
                        <Text style={styles.wishedButtonLabel}><MaterialIcons name="remove-shopping-cart" size={24} color='white' /></Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <View style={styles.wishlistButtonContainer}>
                    <TouchableOpacity style={styles.notWishedProductButton} onPress={()=>this.wishlistProduct(this.state.product.id)}>
                        <Text style={styles.notWishedButtonLabel}><MaterialIcons name="add-shopping-cart" size={24} color='white' /></Text>
                    </TouchableOpacity>
                </View>
            )
        }
    },

    renderLikeButton() {
        if (this.state.product.liked) {
            return (
                <TouchableOpacity style={styles.actionButtonWithRightBorderStyle} onPress={()=>this.unlikeFeedItem()}>
                    <Text style={styles.actionTextStyle}><EntypoIcons name="heart" size={24} color='red' /></Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.actionButtonWithRightBorderStyle} onPress={()=>this.likeFeedItem()}>
                    <Text style={styles.actionTextStyle}><EntypoIcons name="heart-outlined" size={24} /></Text>
                </TouchableOpacity>
            )
        }
    },

    renderProductImages()  {
        if ( !this.state.product || !this.state.product.images )
            return;

        let imgView = this.state.product.images.map((a, i) => {
            return <View key={i} style={styles.productImageContainer}>
                <ImageProgress resizeMode={'contain'} style={styles.productImage} source={{uri : URL.IMAGES_BASE_URL+a.url}}/>
            </View>
        })   
        
        return (
            <ScrollView
                style={styles.productImageScrollContainer}
                automaticallyAdjustInsets={false}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={CARD_WIDTH + CARD_MARGIN*2}
                snapToAlignment="start"
                contentContainerStyle={styles.content}
                showsHorizontalScrollIndicator={false}
            >
                {imgView}
            </ScrollView>
        );
    },

    productAvailable() {
        if (this.state.product.available) {
            availableText = "In Stock"
        }
        else {
            availableText = "Out of Stock"
        }

        return (
            <View style={styles.subsectionContainer}>
                <Text style={styles.subsectionHeading}>Available</Text>
                <Text style={styles.subsectionContent}>{availableText}</Text>
            </View>
        );
    },

    renderProductDetails() {
    
        if (!this.state.product)
            return;

        return (
            <ScrollView>

                {this.renderProductImages()}

                <View style={styles.productDetailsContainer} >
                    <View style={styles.mainSectionContainer}>
                        <Text style={styles.productName}>{this.state.product.name}</Text>
                        <Text style={styles.descriptionContent}>{this.state.product.description}</Text>
                    </View>

                    <View style={styles.subsectionContainer}>
                        <Text style={[styles.aboutProductTitle, {fontSize:15}]}>About This Product</Text>
                    </View>

                    <View style={styles.subsectionContainer}>
                        <Text style={styles.subsectionHeading}>Seller</Text>
                        <Text style={styles.subsectionContent}>{this.state.product.seller.name}</Text>
                    </View>

                    <View style={styles.subsectionContainer}>
                        <Text style={styles.subsectionHeading}>Code</Text>
                        <Text style={styles.subsectionContent}>{this.state.product.universal_code}</Text>
                    </View>

                    {this.productAvailable()}
                </View>

            </ScrollView>
        )
      
    },

    renderProductActionsFooter() {

        if ( !this.state.product )
            return;

        return (
            <View style={styles.footer}>
                {this.renderLikeButton()}
                {this.renderShareButton("product", this.state.product.id, this.state.product.images[0],this.state.product.name)}
                <View style={styles.priceText}>
                    <Text>&#8377;{this.state.product.selling_price}</Text>
                </View>
            </View>
        );
    },

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.appNameContainer} onPress={()=>Actions.pop()}>
                        <MaterialIcons name="arrow-back" size={24} color={'black'} />
                    </TouchableOpacity>
                    <View style={styles.appNameContainer}>
                        <Text style={styles.appName}>Product</Text>
                    </View>
                </View>
                <Spinner visible={this.state.spinnerVisible} />
                <Spinner visible={this.state.shareSpinnerVisible} />
                {this.renderProductDetails()}  
                {this.renderProductActionsFooter()}
                {this.renderWishlistButton()}    
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
    productImageContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: CARD_WIDTH,
        margin: CARD_MARGIN,
        height: 270
    },
    productImageScrollContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    productName: {
        fontSize: 18,
        fontFamily: 'HelveticaNeueMed',
        color: 'black'
    },
    aboutProductTitle: {
        fontSize: 16,
        fontFamily: 'HelveticaNeueMed',
        color: 'black'
        },
    productDetailsContainer: {
        margin: 8,
        marginLeft: 16
    },
    subsectionHeading: {
        fontSize:12
    },    
    subsectionContainer: {
        marginBottom: 8
    },
    subsectionContent: {
        fontFamily: 'HelveticaNeueMed',
        color: 'black',
        fontSize: 13
    },
    descriptionContent: {
        color: 'black',
        fontSize:12
    },
    footer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        height: 48,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1
    },    
    footerItem : {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center'
    },
    actionButtonWithRightBorderStyle: {
        flex: 1,
        padding: 8,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderRightColor: 'rgba(0, 0, 0, 0.1)',
        borderRightWidth: 1,
        alignItems: 'center'
    },
    actionButtonStyle: {
        flex: 1,
        padding: 8,
        alignSelf: 'center',
        alignItems: 'center'
    },
    actionTextStyle: {
        color: 'black',
        fontSize: 14
    },    
    priceText: {
        flex: 1,
        padding: 8,
        alignSelf: 'center',
        alignItems: 'center',
        marginRight:80
    },
    wishlistButtonContainer: {
        position:'absolute',
        right:15,
        bottom:20
    },
    wishedProductButton: {
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:'rgba(255, 112, 160, 1)',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)', 
        alignItems:'center'
    },
    wishedButtonLabel: {
        marginTop: 15
    },
    notWishedProductButton: {
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:'rgba(255, 112, 160, 1)',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)', 
        alignItems:'center'
    },
    notWishedButtonLabel: {
        marginTop: 15
    },
    productImage: {
        height:270,
        flex:1
    },
    mainSectionContainer: {
        marginBottom: 8,
        borderStyle:'solid',
        borderBottomWidth:1, 
        borderBottomColor:'rgba(0,0,0,0.1)', 
        paddingBottom:8
    }
});


module.exports = ProductPage;