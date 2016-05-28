import React, {View, StyleSheet, Text} from "react-native";

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
    var colorHome = this.props.page === 'home' ? 'black' : 'grey';
    var colorFollowing = this.props.page === 'following' ? 'black' : 'grey';
    var colorSearch = this.props.page === 'search' ? 'black' : 'grey';
    var colorWishlist = this.props.page === 'wishlist' ? 'black' : 'grey';
    var colorProfile = this.props.page === 'profile' ? 'black' : 'grey';
    return (
      <View style={styles.footer}>

        <View style={styles.footerItem}>
          <Ionicons name="home" size={24} color={colorHome} />
        </View>

        <View style={styles.footerItem}>
          <MaterialIcons name="add-shopping-cart" size={24} color={colorFollowing} />
        </View>

        <View style={styles.footerItem}>
          <Ionicons name="search" size={24} color={colorSearch} />
        </View>

        <View style={styles.footerItem}>
          <MaterialIcons name="store-mall-directory" size={24} color={colorWishlist} />
        </View>

        <View style={styles.footerItem}>
          <Ionicons name="person" size={24} color={colorProfile} />
        </View>

      </View>
    );
  }
});

module.exports = Footer;