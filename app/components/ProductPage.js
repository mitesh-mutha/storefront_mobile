import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from "react-native-router-flux";

import Footer from "./Footer"

var ImageProgress = require('react-native-image-progress');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var EntypoIcons = require('react-native-vector-icons/Entypo');

const CARD_PREVIEW_WIDTH = 60;
const CARD_MARGIN = 0;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 2;

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
    height: CARD_WIDTH
  },
  productImageScrollContainer: {
    flex: 1,
    backgroundColor: 'white',
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
    fontFamily: 'HelveticaNeueLight',
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
    fontFamily:'HelveticaNeueLight',
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
    height:300,
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

var productDetails; 

var ProductPage = React.createClass({
    getInitialState() {
        productDetails = {
                name : 'Product Name',
                description: 'Description lorem ipsum. lorem ipsum. lorem ipsum.  lorem ipsum. lorem ipsum.',
                code: 'XYZ000007',
                price: 350,
                liked: false,
                wished: false
            };
            console.log(this.state)
        return {product: productDetails}
    },
    unlikeFeedItem() {
        productDetails.liked = false;
        this.setState({product:productDetails});
    },

    likeFeedItem() {
        productDetails.liked = true;
        this.setState({product:productDetails});
    },
    renderShareButton() {
        return (
            <TouchableOpacity style={styles.actionButtonWithRightBorderStyle}>
                <Text style={styles.actionTextStyle}><EntypoIcons name="share" size={24} /></Text>
            </TouchableOpacity>
        )
    },

    renderWishlistButton() {
        if (this.state.product.wished) {
            return (
                <View style={styles.wishlistButtonContainer}>
                    <View style={styles.wishedProductButton}>
                        <Text style={styles.wishedButtonLabel}><MaterialIcons name="add-shopping-cart" size={24} color='white' /></Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.wishlistButtonContainer}>
                    <View style={styles.notWishedProductButton}>
                        <Text style={styles.notWishedButtonLabel}><MaterialIcons name="add-shopping-cart" size={24} color='white' /></Text>
                    </View>
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

    render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.appNameContainer} onPress={()=>Actions.feedpage()}>
            <MaterialIcons name="arrow-back" size={24} color={'black'} />
          </TouchableOpacity>
          <View style={styles.appNameContainer}>
            <Text style={styles.appName}>Storefront</Text>
          </View>
        </View>
             
        <ScrollView>

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
                <View style={styles.productImageContainer}>
                    <ImageProgress resizeMode={'contain'} style={styles.productImage} source={{uri : 'https://is4.revolveassets.com/images/p4/n/z/TFLO-WD48_V3.jpg'}}/>
                </View>
                <View style={styles.productImageContainer}>
                  <ImageProgress resizeMode={'contain'} style={styles.productImage}  source={{uri : 'https://cdnb.lystit.com/photos/c556-2014/06/15/three-floor--kix-dress-mini-dresses-product-1-20821695-3-252296044-normal.jpeg'}}/>
                </View>
                <View style={styles.productImageContainer}>
                  <ImageProgress resizeMode={'contain'} style={styles.productImage}  source={{uri : 'https://cdnb.lystit.com/photos/c556-2014/06/15/three-floor--kix-dress-mini-dresses-product-1-20821695-3-252296044-normal.jpeg'}}/>
                </View>
                <View style={styles.productImageContainer}>
                  <ImageProgress resizeMode={'contain'} style={styles.productImage}  source={{uri : 'https://is4.revolveassets.com/images/p4/n/z/TFLO-WD48_V3.jpg'}}/>
                </View>
            </ScrollView>

            <View style={styles.productDetailsContainer} >
                <View style={styles.mainSectionContainer}>
                    <Text style={styles.productName}>{this.state.product.name}</Text>
                    <Text style={styles.descriptionContent}>{this.state.product.description}</Text>
                </View>

                <View style={styles.subsectionContainer}>
                    <Text style={[styles.aboutProductTitle, {fontSize:15}]}>About This Product</Text>
                </View>

                <View style={styles.subsectionContainer}>
                    <Text style={styles.subsectionHeading}>Code</Text>
                    <Text style={styles.subsectionContent}>{this.state.product.code}</Text>
                </View>

                <View style={styles.subsectionContainer}>
                    <Text style={styles.subsectionHeading}>Color</Text>
                    <Text style={styles.subsectionContent}>Candy Pink</Text>
                </View>

                <View style={styles.subsectionContainer}>
                    <Text style={styles.subsectionHeading}>Fabric</Text>
                    <Text style={styles.subsectionContent}>Cotton</Text>
                </View>

                <View style={styles.subsectionContainer}>
                    <Text style={styles.subsectionHeading}>Length</Text>
                    <Text style={styles.subsectionContent}>34 inch</Text>
                </View>
            </View>

        </ScrollView>

        
        <View style={styles.footer}>
          {this.renderLikeButton()}
          {this.renderShareButton()}
          <View style={styles.priceText}>
              <Text>&#8377;{this.state.product.price}</Text>
          </View>
        </View>
        {this.renderWishlistButton()}

      </View>
        );
    }
});

module.exports = ProductPage;