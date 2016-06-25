import React, {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from "react-native";
import Dimensions from 'Dimensions';
import {Actions} from "react-native-router-flux";

import Footer from "./Footer"
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var EntypoIcons = require('react-native-vector-icons/Entypo');

const MK = require('react-native-material-kit');

const {
  MKButton,
  MKColor,
  getTheme
} = MK;

const CARD_PREVIEW_WIDTH = 60;
const CARD_MARGIN = 5;
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
  appnamecontainer: {
    padding: 8,
    alignSelf: 'center'
  },
  appname: {
    fontSize: 18,
    fontFamily: 'HelveticaNeueMed',
    color: 'black'
  },
  imgstyle: {
        flex:1,
        resizeMode:'contain'
    },
content: {
    alignItems: 'flex-start',
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    height: CARD_WIDTH
  },
  scrollcontainer: {
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
    fab: {
        width: 60,
        height: 60
    }
});

const AccentColoredFab = MKButton.accentColoredFab().withBackgroundColor('#FFFFFF').withStyle(styles.fab).build();
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

    renderFAButton() {
        if (this.state.product.liked) {
            return (
                <View style={{position:'absolute',right:15,bottom:20}}>
                    <AccentColoredFab onPress={()=>this.unlikeFeedItem()}><MaterialIcons name="add-shopping-cart" size={24}  color={'red'}/></AccentColoredFab>
                </View>
            )
        }
        else {
            return (
                <View style={{position:'absolute',right:15,bottom:20}}>
                    <AccentColoredFab  onPress={()=>this.likeFeedItem()}><MaterialIcons name="add-shopping-cart" size={24} /></AccentColoredFab>
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
          <TouchableOpacity style={styles.appnamecontainer} onPress={()=>Actions.feedpage()}>
            <MaterialIcons name="arrow-back" size={24} color={'black'} />
          </TouchableOpacity>
          <View style={styles.appnamecontainer}>
            <Text style={styles.appname}>Storefront</Text>
          </View>

        </View>
             
        <ScrollView>
            <ScrollView
                style={styles.scrollcontainer}
                automaticallyAdjustInsets={false}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={CARD_WIDTH + CARD_MARGIN*2}
                snapToAlignment="start"
                contentContainerStyle={styles.content}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.card}>
                    <Image style={{height:300,resizeMode:'contain',flex:1}} source={{uri : 'https://is4.revolveassets.com/images/p4/n/z/TFLO-WD48_V3.jpg'}}/>
                </View>
                <View style={styles.card}>
                  <Image style={{height:300,resizeMode:'contain',flex:1}}  source={{uri : 'https://cdnb.lystit.com/photos/c556-2014/06/15/three-floor--kix-dress-mini-dresses-product-1-20821695-3-252296044-normal.jpeg'}}/>
                </View>
                <View style={styles.card}>
                  <Image style={{height:300,resizeMode:'contain',flex:1}}  source={{uri : 'https://cdnb.lystit.com/photos/c556-2014/06/15/three-floor--kix-dress-mini-dresses-product-1-20821695-3-252296044-normal.jpeg'}}/>
                </View>
                <View style={styles.card}>
                  <Image style={{height:300,resizeMode:'contain',flex:1}}  source={{uri : 'https://is4.revolveassets.com/images/p4/n/z/TFLO-WD48_V3.jpg'}}/>
                </View>
            </ScrollView>

            <View style={styles.productDetailsContainer} >
                <View style={styles.subsectionContainer}>
                    <Text style={styles.productName}>{this.state.product.name}</Text>
                    <Text style={[styles.subsectionContent,{fontFamily:'HelveticaNeueLight',fontSize:12}]}>{this.state.product.description}</Text>
                </View>

                <View style={[styles.subsectionContainer,{borderStyle:'solid',borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,0.1)', paddingBottom:8}]}>
                    <Text style={styles.subsectionHeading}>Price</Text>
                    <Text style={styles.subsectionContent}>&#8377;{this.state.product.price}</Text>
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

        {this.renderFAButton()}
        <View style={styles.footer}>
          {this.renderLikeButton()}
          {this.renderShareButton()}
          <View style={styles.priceText}>
              <Text>&#8377;{this.state.product.price}</Text>
          </View>
        </View>

      </View>
        );
    }
});

module.exports = ProductPage;