import React, {Component} from 'react';
import {View, StyleSheet, Image, AsyncStorage, Text, ScrollView} from 'react-native';
import {Actions, ActionConst} from "react-native-router-flux";
import Utility from './../utilities';
import Strings from './../strings';

var Ionicons = require('react-native-vector-icons/Ionicons');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');

var TutorialPage = React.createClass({

    async saveTutorialSeen() {
        try {
            await AsyncStorage.setItem("tutorial_seen", "true");            
        }
        catch (error) {
            utility.showAlertWithOK(Strings.ERROR_STORING_AUTH_TOKEN, Strings.ERROR_STORING_AUTH_TOKEN_MSG);  
        }
    },

    componentDidMount() {
        this.saveTutorialSeen();
    },

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.appNameContainer}>
                        <Text style={styles.appName}>Tutorial</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.headingContainer}>
                        <Text>The different sections of the application are explained below</Text>
                    </View> 

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="md-home" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>All products and posts, from the sellers you follow, will be shown here.</Text>
                        </View>
                    </View>

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="add-shopping-cart" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>Wishlist your favourite products and get information directly from the seller.</Text>
                        </View>
                    </View>

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="md-search" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>In this section, you can search for sellers who are on Storefront.</Text>
                        </View>
                    </View>

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="store-mall-directory" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>The list of sellers you follow can be found here.</Text>
                        </View>
                    </View>

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="md-person" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>You can check your profile here.</Text>
                        </View>
                    </View>
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
    iconExplainerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginLeft: 8
    },
    explanationContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 8,
        paddingLeft: 8,
        flex:1,
        marginTop: 4
    },
    explanationText: {
        fontSize: 12
    },
    iconContainer: {
        height: 48,
        width: 48,
        marginTop:8,
        marginBottom:8,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    headingContainer: {
        alignItems: 'center',
        marginLeft: 8
    }
});

module.exports = TutorialPage;