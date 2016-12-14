import React, {Component} from 'react';
import {View, StyleSheet, Image, AsyncStorage, Text, ScrollView, TouchableOpacity} from 'react-native';
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
            utility.showAlertWithOK(Strings.ERROR, Strings.ERROR_STORING_TUTORIAL_SEEN_MSG);  
        }
    },

    componentDidMount() {
        if (this.props.tracker){
            this.props.tracker.trackScreenView('TutorialPage');
        }
        this.saveTutorialSeen();
    },

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.appNameContainer} onPress={()=>Actions.pop()}>
                        <MaterialIcons name="close" size={24} color={'black'} />
                    </TouchableOpacity>
                    <View style={styles.appNameContainer}>
                        <Text style={styles.appName}>{Strings.TUTORIAL}</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.headingContainer}>
                        <Text>{Strings.TUTORIAL_HEADING_1}</Text>
                    </View> 

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="md-home" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>{Strings.FEED_EXPLANATION}</Text>
                        </View>
                    </View>

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="add-shopping-cart" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>{Strings.WISHLIST_EXPLANATION}</Text>
                        </View>
                    </View>

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="md-search" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>{Strings.SEARCH_EXPLANATION}</Text>
                        </View>
                    </View>

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="store-mall-directory" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>{Strings.FOLLOW_EXPLANATION}</Text>
                        </View>
                    </View>

                    <View style={styles.iconExplainerContainer}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="md-person" size={32} color={'black'} />
                        </View>
                        <View style={styles.explanationContainer}>
                            <Text style={styles.explanationText}>{Strings.PROFILE_EXPLANATION}</Text>
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