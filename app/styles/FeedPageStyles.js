import React, {StyleSheet} from "react-native";
import {  MKButton,  MKColor,  MKIconToggle,  getTheme } from 'react-native-material-kit';

const theme = getTheme();

var FeedPageStyles = StyleSheet.create({
    feedItemStyle: {
        margin:10,
        marginBottom:20
    },
    feedItemCardStyle: theme.cardStyle,
    sellerNameStyle: {
        borderStyle: 'solid',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1,
        padding: 15,
    },
    feedImageStyle: {
        flex:1,
        resizeMode:'contain', 
        height:200
    },
    sellerNameTextStyle: {
        fontWeight: 'bold',
        fontSize: 14
    },
    itemNameStyle: {
        padding: 15
    },
    itemNameTextStyle: {
        padding: 15,
        color: 'rgba(0, 0, 0, 0.54)',
        padding:0,
        fontWeight:'bold'
    },
    actionButtonContainerStyle: {
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(55, 55, 55, 1);'
    },
    actionButtonWithRightBorderStyle: {
        flex: 1,
        padding: 8,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderRightColor: 'rgba(255, 255, 255, 1)',
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
        color: 'white'
    }
});

module.exports = FeedPageStyles