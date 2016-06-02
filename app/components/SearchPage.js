import React, {View, Text, StyleSheet, Navigator, ScrollView, TextInput, Image} from "react-native"
import Footer from "./Footer"

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
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    }
  },
  appnamecontainer: {
    padding: 8,
    alignSelf: 'center'
  },
  appname: {
    fontSize: 18,
    fontFamily: 'HelveticaNeueMed',
    color: 'black'
  },
  sellerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    marginLeft: 8
  },
  detailContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 8,
    paddingLeft: 8
  },
  sellerAvatar: {
    height: 32,
    borderRadius: 16,
    width: 32
  },
  sellerName: {  
    fontFamily: 'HelveticaNeueMedium',
    color: 'black'
  },
  productName: {
    fontFamily: 'HelveticaNeueLight'
  }
});

class SearchPage extends React.Component {
  render(){
    return (
      <View style={styles.container}>

        <ScrollView style={{flex:1}}>
          
          <View style={{flex:1, marginTop: 100, padding:8}}>
            <Text style={[styles.appname,{alignSelf:'center',fontSize:36}]}>Storefront</Text>
          </View>

          <View style={{
            flex:1,
            margin: 16, 
            backgroundColor: 'white',
            elevation: 4,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 2,
          }}}>
            <TextInput
              placeholder="Search"
              underlineColorAndroid='white'
              style={{height: 40}}/>
          </View>

          <View style={{
            flex:1,
            marginLeft:16,
            marginRight:16,
            marginTop: 24,
            backgroundColor: 'white',
            elevation: 4,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 2,
          }}}>
            <View style={styles.sellerContainer}>
              <Image style={styles.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
              <View style={styles.detailContainer}>
                <Text style={styles.sellerName}>Arnav Jewellers</Text>
                <Text style={styles.productName}>xyz</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex:1,
            marginLeft:16,
            marginRight:16,
            marginTop: 12,
            backgroundColor: 'white',
            elevation: 4,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 2,
          }}}>
          <View style={styles.sellerContainer}>
              <Image style={styles.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
              <View style={styles.detailContainer}>
                <Text style={styles.sellerName}>Arnav Jewellers</Text>
                <Text style={styles.productName}>xyz</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex:1,
            marginLeft:16,
            marginRight:16,
            marginTop: 12,
            backgroundColor: 'white',
            elevation: 4,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 2,
          }}}>
          <View style={styles.sellerContainer}>
              <Image style={styles.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
              <View style={styles.detailContainer}>
                <Text style={styles.sellerName}>Arnav Jewellers</Text>
                <Text style={styles.productName}>xyz</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex:1,
            marginLeft:16,
            marginRight:16,
            marginTop: 12,
            backgroundColor: 'white',
            elevation: 4,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 2,
          }}}>
          <View style={styles.sellerContainer}>
              <Image style={styles.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
              <View style={styles.detailContainer}>
                <Text style={styles.sellerName}>Arnav Jewellers</Text>
                <Text style={styles.productName}>xyz</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex:1,
            marginLeft:16,
            marginRight:16,
            marginTop: 12,
            backgroundColor: 'white',
            elevation: 4,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 2,
          }}}>
          <View style={styles.sellerContainer}>
              <Image style={styles.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
              <View style={styles.detailContainer}>
                <Text style={styles.sellerName}>Arnav Jewellers</Text>
                <Text style={styles.productName}>xyz</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex:1,
            marginLeft:16,
            marginRight:16,
            marginTop: 12,
            marginBottom: 24,
            backgroundColor: 'white',
            elevation: 4,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 2,
          }}}>
          <View style={styles.sellerContainer}>
              <Image style={styles.sellerAvatar} source={{uri: 'http://placehold.it/24x24'}}/>
              <View style={styles.detailContainer}>
                <Text style={styles.sellerName}>Arnav Jewellers</Text>
                <Text style={styles.productName}>xyz</Text>
              </View>
            </View>
          </View>


        </ScrollView>
        
        <Footer page='search'/>

      </View>
    );
  }
}

module.exports = SearchPage;