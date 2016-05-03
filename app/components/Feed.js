import React, {ListView, View, Text, StyleSheet, ScrollView, Image} from "react-native";
import {
  MKButton,
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';

const theme = getTheme();

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

    _renderRow (feeditem) {
        var base64Icon = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
        var action = (<Text> My action</Text>);
        return(
            <View style={{margin:10,marginBottom:20}}>
            <View style={theme.cardStyle}>
            <View style={{borderStyle: 'solid',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    padding: 15}}>
              <Text style={{fontWeight:'bold'}}>{feeditem.seller}</Text>
            </View>
            <Image source={{uri : feeditem.coverimg}} style={[theme.cardImageStyle,{resizeMode:'contain', height:200}]}/>
            <View  // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
              style={{
                padding : 15,
              }}
              >
              <Text style={[theme.cardContentStyle, {padding:0,fontWeight:'bold'}]}>
                {feeditem.title}
              </Text>
            </View>
            <View style={theme.cardActionStyle}>
              
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