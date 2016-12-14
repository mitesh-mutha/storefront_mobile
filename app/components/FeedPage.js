import React, {Component} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import Feed from "./Feed";
import Footer from "./Footer";
import Strings from './../strings';

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
    activityIndicatorStyle: {
        height: 40, 
        justifyContent: 'center', 
        flex: 1
    },
    activityIndicatorContainer: {
        flex: 1, 
        alignItems: 'flex-end'
    }
});

var FeedPage = React.createClass ({

    getInitialState() {
        return {
            showLoadingSpinner: false
        }
    },

    componentDidMount() {
        if (this.props.tracker){
            this.props.tracker.trackScreenView('FeedPage');
        }
    },

    setLoadingSpinner(value)  {
        this.setState({showLoadingSpinner: value});
    },

    renderLoadingMessage() {
        if (this.state.showLoadingSpinner) {
            return ( 
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.activityIndicatorStyle}
                        size="large" />
                </View>
            );
        }
        else {
            return;
        }
    },

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.appNameContainer}>
                        <Text style={styles.appName}>{Strings.FEED}</Text>
                    </View>
                    {this.renderLoadingMessage()}
                </View>

                <Feed 
                    phone={this.props.phone} 
                    authentication_token={this.props.authentication_token}
                    loadingFunc = {this.setLoadingSpinner}
                    tracker = {this.props.tracker} />
            
                <Footer page='home' 
                    phone={this.props.phone} 
                    authentication_token={this.props.authentication_token} />

            </View>
        );
    }
});

module.exports = FeedPage;