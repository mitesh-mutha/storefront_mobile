import React, {View, Text, StyleSheet, Navigator, ScrollView, Image, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import Carousel from 'react-native-carousel-control';
import Dimensions from 'Dimensions';

var EntypoIcons = require('react-native-vector-icons/Entypo');
var productDetails; 

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "white",
    },
    footer: {
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start'
    },
    imgstyle: {
        flex:1,
        resizeMode:'contain'
    },
    priceText: {
        flex: 1,
        padding: 8,
        alignSelf: 'center',
        alignItems: 'center'
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
        fontSize:24
    }
});

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

                    <Text>{this.state.product.description}</Text>
                    <Text>{this.state.product.code}</Text>

                </ScrollView>
                <View style={style.footer}>
                    {this.renderLikeButton()}
                    {this.renderWishlistButton()}
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