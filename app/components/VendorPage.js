import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {Actions} from "react-native-router-flux";
import Communications from 'react-native-communications';
import utility from './../utilities';
import Strings from './../strings';
import URL from './../urls';
import Spinner from 'react-native-loading-spinner-overlay';

var EntypoIcons = require('react-native-vector-icons/Entypo');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var Carousel = require('react-native-carousel');

var VendorPage = React.createClass({
    getInitialState() {
        return ({seller:{
            "id": this.props.seller_id,
            "name": "Kuber Jewelers ",
            "fb_link": null,
            "website": null,
            "categories": [],
            "logo": null,
            "images": [],
            "contact_number": null,
            "latitude_and_longitude": null,
            "followed": true
        },
        spinnerVisible: false
    });
    },

  componentDidMount() {

    this.setState({spinnerVisible: true});

    url = URL.API_URL.SELLER_DETAILS_URL+"/"+this.props.seller_id+"?"+
        "phone="+this.props.phone+"&"+
        "authentication_token="+this.props.authentication_token;

    fetch(url,{
        method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({spinnerVisible: false});
        if (responseJson.status === 'success') {
            this.setState({seller: responseJson.sellers});
        }
        else {
            utility.showAlertWithOK(Strings.REQUEST_FAILED, "Error");
        }
    })
    .catch((error) =>  {
        this.setState({spinnerVisible: false});
        utility.showAlertWithOK(Strings.REQUEST_FAILED, error.message);
    });
    return;
  },

  renderStoreImages()  {
        if (!this.state.seller)
            return;
        if (!this.state.seller.images)
            return;
        if (this.state.seller.images.length == 0)
            return;

        let imgView = this.state.seller.images.map((a, i) => {
            return <View key={i} style={styles.carous}>
                <ImageProgress resizeMode={'contain'} source={{uri : URL.IMAGES_BASE_URL+a}}/>
            </View>
        })   
        return (
            <Carousel 
                animate={true} 
                delay={2000} 
                loop={true} 
                indicatorAtBottom={true} 
                indicatorOffset={0} 
                indicatorColor="#FFFFFF"
                indicatorSize={30}
                indicatorSpace={15} >
                {imgView}
            </Carousel>
        );
    },

    callContact() {
        if (!this.state.seller)
            return;
        if (!this.state.seller.contact_number)
            return;
        
        Communications.phonecall(this.state.seller.contact_number, false);
    },

    openAddressLocation() {
        if (!this.state.seller)
            return;
        if (!this.state.seller.latitude_and_longitude)
            return;

        url = "geo:"+this.state.seller.latitude_and_longitude+"?q=" + this.state.seller.name;

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
            return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    },

    renderContactSection() {
        if (!this.state.seller)
            return;
        if (!this.state.seller.contact_number)
            return;

        return (
            <View style={styles.sectionContainer}>

                <View style={styles.actionDetailsContainer}>
                    <View style={styles.sectionHeadingContainer}>
                        <Text style={styles.sectionHeadingText}>Contact Number</Text>
                    </View>

                    <View style={styles.sectionTextContainer}>
                        <Text style={styles.sectionText}>{this.state.seller.contact_number}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.actionIconContainer} onPress={()=>this.callContact()}>
                    <MaterialIcons name="call" size={24} color='rgba(67, 164, 229, 1)' />
                </TouchableOpacity>
            </View>   
        )
    },

    renderAddressSection() {
        if (!this.state.seller)
            return;
        if (!this.state.seller.address)
            return;

        return (
            <View style={styles.sectionContainer}>

                <View style={styles.actionDetailsContainer}>
                    <View style={styles.sectionHeadingContainer}>
                        <Text style={styles.sectionHeadingText}>Address</Text>
                    </View>

                    <View style={styles.sectionTextContainer}>
                        <Text style={styles.sectionText}>{this.state.seller.address}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.actionIconContainer} onPress={()=>this.openAddressLocation()}>
                    <MaterialIcons name="place" size={24} color='rgba(67, 164, 229, 1)' />
                </TouchableOpacity>

            </View>
        )
    },

    openFacebookLink() {
        if (!this.state.seller)
            return;
        if (!this.state.seller.fb_link)
            return;

        url = this.state.seller.fb_link;

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    },

    renderFacebookSection() {
        if (!this.state.seller)
            return;
        if (!this.state.seller.fb_link)
            return;

        return (
            <View style={styles.sectionContainer}>

                <View style={styles.actionDetailsContainer}>
                    <View style={styles.sectionHeadingContainer}>
                        <Text style={styles.sectionHeadingText}>Facebook</Text>
                    </View>

                    <View style={styles.sectionTextContainer}>
                        <Text style={styles.sectionText}>{this.state.seller.fb_link}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.actionIconContainer} onPress={()=>this.openFacebookLink()}>
                    <EntypoIcons name="facebook" size={24} color='rgba(67, 164, 229, 1)' />
                </TouchableOpacity>

            </View>
        )
    },

    openWebsiteLink() {
        if (!this.state.seller)
            return;
        if (!this.state.seller.website)
            return;

        url = this.state.seller.website;

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    },

    renderWebsiteSection() {
        if (!this.state.seller)
            return;
        if (!this.state.seller.website)
            return;

        return (
            <View style={styles.sectionContainer}>

                <View style={styles.actionDetailsContainer}>
                    <View style={styles.sectionHeadingContainer}>
                        <Text style={styles.sectionHeadingText}>Website</Text>
                    </View>

                    <View style={styles.sectionTextContainer}>
                        <Text style={styles.sectionText}>{this.state.seller.website}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.actionIconContainer} onPress={()=>this.openWebsiteLink()}>
                    <MaterialIcons name="open-in-browser" size={24} color='rgba(67, 164, 229, 1)' />
                </TouchableOpacity>

            </View>
        )
    },

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.appNameContainer} onPress={()=>Actions.pop()}>
                        <MaterialIcons name="arrow-back" size={24} color={'black'} />
                    </TouchableOpacity>
                    <View style={styles.appNameContainer}>
                        <Text style={styles.appName}>Seller</Text>
                    </View>
                </View>

                <Spinner visible={this.state.spinnerVisible} />

                {this.renderStoreImages()}

                <ScrollView style={styles.scrollContainer}>

                    <View style={styles.sellerNameContainer}>
                        <Text style={styles.sellerNameText}>{this.state.seller.name}</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        {this.renderWebsiteSection()}
                        {this.renderFacebookSection()}
                        {this.renderContactSection()}
                        {this.renderAddressSection()}
                    </View>

                    <TouchableOpacity style={styles.catalogButton} onPress={()=>Actions.catalogpage({
                        'phone': this.props.phone, 
                        'authentication_token': this.props.authentication_token,
                        'seller_id': this.props.seller_id
                    })}>
                        <Text style={styles.catalogLabel}>Catalog</Text>
                    </TouchableOpacity>       

                </ScrollView>

            </View>
        )
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
    scrollContainer: {
        flex: 1
    },
    carous: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    sellerNameContainer: {
        margin: 8,
        alignItems:'center'
    },
    sellerNameText: {
        color:'black',
        fontSize: 24
    },
    detailsContainer: {
        flex: 1,
        marginTop: 24,
        marginRight: 16,
        marginLeft: 16
    },
    sectionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        margin: 8,
    },
    sectionHeadingContainer: {
        flex: 1,
        margin: 2
    },
    sectionTextContainer: {
        flex: 1,
        marginLeft: 2,
        marginRight: 2
    },
    actionIconContainer: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8
    },
    actionDetailsContainer: {
        flex: 1
    },
    sectionHeadingText: {
        color: 'black',
        fontFamily: 'HelveticaNeueMed',
        fontSize: 12
    },
    sectionText: {
        fontSize: 12
    },
    catalogButton: {
        margin: 16,
        backgroundColor: 'rgba(67, 164, 229, 1)',
        alignItems: 'center'
    },
    catalogLabel: {
        flex:1, 
        color:'white', 
        fontFamily:'HelveticaNeueMed', 
        margin:8
    }
});

module.exports = VendorPage;