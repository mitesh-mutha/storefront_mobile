import React, {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import Dimensions from 'Dimensions';

import Footer from "./Footer"



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
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    }
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
    color: 'black' 
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
    render(){
    return (
      <View style={styles.container}>

        <View style={styles.header}>
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
                    <Text style={styles.aboutProductTitle}>About This Product</Text>
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

        <Footer page='home'/>

      </View>
        );
    }
});

module.exports = ProductPage;