import React, {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";

var Ionicons = require('react-native-vector-icons/Ionicons');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 48,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1
  },
  footerItem : {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center'
  }
});

var Footer = React.createClass({
  render() {
    var colorHome = this.props.page === 'home' ? 'black' : 'silver';
    var colorFollowing = this.props.page === 'following' ? 'black' : 'silver';
    var colorSearch = this.props.page === 'search' ? 'black' : 'silver';
    var colorWishlist = this.props.page === 'wishlist' ? 'black' : 'silver';
    var colorProfile = this.props.page === 'profile' ? 'black' : 'silver';
    return (
      <View style={styles.footer}>

        <TouchableOpacity style={styles.footerItem} onPress={()=>Actions.feedpage()}>
          <Ionicons name="home" size={24} color={colorHome} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <MaterialIcons name="add-shopping-cart" size={24} color={colorWishlist} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={()=>Actions.searchpage()}>
          <Ionicons name="search" size={24} color={colorSearch} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={()=>Actions.followpage()}>
          <MaterialIcons name="store-mall-directory" size={24} color={colorFollowing} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={()=>Actions.profilepage()}>
          <Ionicons name="person" size={24} color={colorProfile} />
        </TouchableOpacity>

      </View>
    );
  }
});

module.exports = Footer;