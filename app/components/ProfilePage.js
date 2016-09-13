import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, ScrollView, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import Footer from "./Footer"
import {Actions} from "react-native-router-flux";
import URL from './../urls';
import utility from './../utilities';
import Strings from './../strings';
import Dimensions from 'Dimensions';
import Spinner from 'react-native-loading-spinner-overlay';
import Share from "react-native-share";

var ImageProgress = require('react-native-image-progress');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');

var ProfilePage = React.createClass({
    getInitialState() {
        return {
            customer : null,
            spinnerVisible: false
        }
    },

    componentDidMount() {
        url = URL.API_URL.CUSTOMER_DETAILS_URL+"?"+
            "phone="+this.props.phone+"&"+
            "authentication_token="+this.props.authentication_token;

        this.setState({spinnerVisible: true});

        fetch(url,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({spinnerVisible: false});
            if ( responseJson.status && responseJson.status === "success") {
                this.setState({customer: responseJson.customer});
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

    logoutFromApp() {
        utility.clearLoginDetails();
    },

    getUserProfileImgUri() {
        if (this.state.customer.profileimg) {
            return this.state.customer.profileimg;
        }
        else {
            if (this.state.customer.gender) {
                if (this.state.customer.gender === "male") {
                    return URL.AVATAR_URL.MALE_AVATAR;
                }
                else if (this.state.customer.gender === "female") {
                    return URL.AVATAR_URL.FEMALE_AVATAR;
                }
                else {
                    return URL.AVATAR_URL.GENERIC_AVATAR;
                }
            }
            else {
                return URL.AVATAR_URL.GENERIC_AVATAR;
            }
        }
    },

    renderEmailDetails() {
        return (
            <View style={styles.userDetailContainer}>
                <Text style={styles.userDetailLabel}>Email</Text>
                <Text style={styles.userDetailValue}>{this.state.customer.email}</Text>
            </View>
        );
    },

    renderPhoneDetails() {
        return (
            <View style={styles.userDetailContainer}>
                <Text style={styles.userDetailLabel}>Phone</Text>
                <Text style={styles.userDetailValue}>{this.state.customer.phone_number}</Text>
            </View>
        );
    },

    renderMemberSinceDetails() {
        return (
            <View style={styles.userDetailContainer}>
                <Text style={styles.userDetailLabel}>Member since</Text>
                <Text style={styles.userDetailValue}>{this.state.customer.member_since}</Text>
            </View>
        );
    },

    renderCustomerDetails() {
        if (this.state.customer === null)
            return;

        img_uri = this.getUserProfileImgUri();

        return (
            <View style={styles.userProfileContainer}>
                <View style={styles.userNameAndStatsContainer}>
                    <View style={styles.userNameAndAvatarContainer}>
                        <ImageProgress style={styles.userAvatar} source={{uri: img_uri}}/>
                        <Text style={styles.userName}>{this.state.customer.name}</Text>
                    </View>
             
                    <View style={styles.statsContainer}>  
                        <View style={styles.statContainer}>
                            <Text style={styles.statValue}>{this.state.customer.liked}</Text>
                            <Text style={styles.statLabel}>liked</Text>
                        </View>

                        <View style={styles.statContainer}>
                            <Text style={styles.statValue}>{this.state.customer.wishlist}</Text>
                            <Text style={styles.statLabel}>wishlisted</Text>
                        </View>

                        <View style={styles.statContainer}>
                            <Text style={styles.statValue}>{this.state.customer.followed}</Text>
                            <Text style={styles.statLabel}>following</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.userDetailsContainer}>
                    {this.renderEmailDetails()}
                    {this.renderPhoneDetails()}
                    {this.renderMemberSinceDetails()}
                </View>

            </View>
        );
    },

    inviteFriends() {
        Share.open({
            share_text: Strings.INVITE_FRIENDS_TEXT,
            share_URL: "http://storefrontindia.com",
            title: "Invite Friends"
        },(e) => {
            console.log(e);
        });
        return;
    },

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.appNameContainer}>
                        <Text style={styles.appName}>Storefront</Text>
                    </View>
                </View>

                <Spinner visible={this.state.spinnerVisible} />
                <ScrollView style={styles.scrollContainer}>          

                    {this.renderCustomerDetails()}
            
                    <TouchableOpacity style={styles.profileActions} onPress={()=>this.inviteFriends()}>
                        <MaterialIcons name='person-add' size={16} color='black' /><Text style={styles.actionLabel}>     Invite Friends</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.profileActions} onPress={()=>this.logoutFromApp()}>
                        <MaterialIcons name='exit-to-app' size={16} color='black' /><Text style={styles.actionLabel}>      Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>

        
                <Footer page='profile' phone={this.props.phone} authentication_token={this.props.authentication_token}/>

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
    userNameAndStatsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 8
    },
    userProfileContainer: {
        flex: 1,
        alignItems: 'flex-start',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(79, 79, 79, 0.1)',
        paddingBottom: 8
    },
    userAvatar: {
        height: 88,
        borderRadius: 44,
        width: 88,
        marginTop:10,
        marginBottom:10,
        alignSelf: 'center'
    },
    userName: {  
        fontFamily: 'HelveticaNeueMedium',
        color: 'black'
    },
    statsContainer: {
        flex:1, 
        flexDirection:'row', 
        alignItems:'stretch', 
        marginTop:22
    },
    scrollContainer: {
        flex: 1
    },
    userNameAndAvatarContainer: {
        marginLeft: 8, 
        marginRight: 8, 
        marginBottom: 8, 
        alignItems:'center'
    },
    statContainer: {
        flex:1, 
        alignItems:'center', 
        margin: 4
    },
    statValue: {
        fontSize: 20, 
        fontFamily: 'HelveticaNeueMedium', 
        color: 'black'
    },    
    statLabel: {
        fontSize: 10
    },
    profileActions: {
        margin: 16, 
        alignSelf: 'stretch', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    actionLabel: {
        color:'black', 
        fontSize: 16, 
        fontFamily:'HelveticaNeueMedium'
    },
    userDetailsContainer: {
        marginLeft: 16,
        marginRight: 16
    },
    userDetailLabel: {
        fontSize: 10,
        padding: 8
    },
    userDetailValue: {
        fontFamily: 'HelveticaNeueMedium', 
        color: 'black',
        padding: 8
    },
    userDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center'
    }
});

module.exports = ProfilePage;