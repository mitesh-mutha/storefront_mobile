import React, {Component} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import Feed from "./Feed";
import Footer from "./Footer";

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
    }
});

var FeedPage = React.createClass ({

    getInitialState() {
        return {
            showLoadingSpinner: false
        }
    },

    setLoadingSpinner(value)  {
        this.setState({showLoadingSpinner: value});
    },

    renderLoadingMessage() {
        if (this.state.showLoadingSpinner) {
            return ( 
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <ActivityIndicator
                        animating={true}
                        style={{height: 40, justifyContent: 'center', flex: 1}}
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
                        <Text style={styles.appName}>Feed</Text>
                    </View>
                    {this.renderLoadingMessage()}
                </View>

                <Feed 
                    phone={this.props.phone} 
                    authentication_token={this.props.authentication_token}
                    loadingFunc = {this.setLoadingSpinner} />
            
                <Footer page='home' phone={this.props.phone} authentication_token={this.props.authentication_token} />

            </View>
        );
    }
});

module.exports = FeedPage;