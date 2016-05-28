import React, {View, Text, StyleSheet, Navigator, ScrollView, Image, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import Carousel from 'react-native-carousel-control';
import Dimensions from 'Dimensions';
const MK = require('react-native-material-kit');

const {
  MKButton,
  MKColor,
  getTheme
} = MK;

const theme = getTheme();

var EntypoIcons = require('react-native-vector-icons/Entypo');
var productDetails; 

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "grey"
    },
    productDetails: theme.cardStyle,
    footer: {
        height: 45,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1,
    },
    imgstyle: {
        flex:1,
        resizeMode:'contain'
    },
    priceText: {
        flex: 1,
        padding: 8,
        alignSelf: 'center',
        alignItems: 'center',
        marginRight:80
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
    productName: {
        fontSize:24,
        color: 'black'
    },
    fab: {
        width: 60,
        height: 60
    },
    subsectionContent: {
        color: 'black'
    },
    subsectionHeading: {
        
    },
    subsectionContainer: {
        marginBottom: 20
    }
});

const AccentColoredFab = MKButton.accentColoredFab().withBackgroundColor('#FFFFFF').withStyle(style.fab).build();

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

    renderFAButton() {
        if (this.state.product.liked) {
            return (
                <View style={{position:'absolute',right:15,bottom:20}}>
                    <AccentColoredFab onPress={()=>this.unlikeFeedItem()}><EntypoIcons name="heart-outlined" size={24} /></AccentColoredFab>
                </View>
            )
        }
        else {
            return (
                <View style={{position:'absolute',right:15,bottom:20}}>
                    <AccentColoredFab  onPress={()=>this.likeFeedItem()}><EntypoIcons name="heart" size={24} color='red' /></AccentColoredFab>
                </View>
            )
        }
    },

    renderLikeButton() {
        if (this.state.product.liked) {
            return (
                <TouchableOpacity style={style.actionButtonWithRightBorderStyle} onPress={()=>this.unlikeFeedItem()}>
                    <Text style={style.actionTextStyle}><EntypoIcons name="heart-outlined" size={24} /></Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={style.actionButtonWithRightBorderStyle} onPress={()=>this.likeFeedItem()}>
                    <Text style={style.actionTextStyle}><EntypoIcons name="heart" size={24} color='red' /></Text>
                </TouchableOpacity>
            )
        }
    },

    renderWishlistButton() {
        if (this.state.product.wished) {
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
            <TouchableOpacity style={style.actionButtonWithRightBorderStyle}>
                <Text style={style.actionTextStyle}><EntypoIcons name="share" size={24} /></Text>
            </TouchableOpacity>
        )
    },

    render(){
        return (
            <View style={style.container}>
                <ScrollView>
                    <Carousel pageStyle={{backgroundColor: "white"}} pageWidth={200} sneak={80}>
                            {/*<View style={{height:300, borderWidth:1, borderRadius: 1, borderStyle:'solid', borderColor:'black'}}>*/}
                            <View style={{height:300}}>
                                <Image source={{uri : 'https://cdnb.lystit.com/photos/c556-2014/06/15/three-floor--kix-dress-mini-dresses-product-1-20821695-3-252296044-normal.jpeg'}} style={style.imgstyle}/>
                            </View>
                            <View style={{height:300}}>
                                <Image source={{uri : 'http://images.asos-media.com/inv/media/5/0/8/7/4197805//image3xl.jpg'}} style={style.imgstyle}/>
                            </View>
                            <View style={{height:300}}>
                                <Image source={{uri : 'https://is4.revolveassets.com/images/p4/n/z/TFLO-WD48_V3.jpg'}} style={style.imgstyle}/>
                            </View>
                    </Carousel>
                    <Text style={style.productName}>{this.state.product.name}</Text>

                    <View style={[style.productDetails,{margin:5, padding:8}]}>             
                        
                        <View style={style.subsectionContainer}>
                            <Text style={style.subsectionHeading}>Description</Text>
                            <Text style={style.subsectionContent}>{this.state.product.description}</Text>
                        </View>

                        <View style={style.subsectionContainer}>
                            <Text style={style.subsectionHeading}>Code</Text>
                            <Text style={style.subsectionContent}>{this.state.product.code}</Text>
                        </View>

                        <View style={style.subsectionContainer}>
                            <Text style={style.subsectionHeading}>Color</Text>
                            <Text style={style.subsectionContent}>Candy Pink</Text>
                        </View>

                        <View style={style.subsectionContainer}>
                            <Text style={style.subsectionHeading}>Fabric</Text>
                            <Text style={style.subsectionContent}>Cotton</Text>
                        </View>

                        <View style={style.subsectionContainer}>
                            <Text style={style.subsectionHeading}>Length</Text>
                            <Text style={style.subsectionContent}>34 inch</Text>
                        </View>
                    </View>

                    

                </ScrollView>
                {this.renderFAButton()}
                <View style={style.footer}>
                    {this.renderLikeButton()}
                    {this.renderShareButton()}
                    <View style={style.priceText}>
                        <Text>{this.state.product.price}</Text>
                    </View>
                </View>

            </View>
        );
    }
});

module.exports = ProductPage;