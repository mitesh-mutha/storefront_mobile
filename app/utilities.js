import {Alert} from 'react-native';

module.exports = {
  showAlertWithOK: function(title, msg) {
    Alert.alert(
      title,
      msg,
      [{text: 'OK', onPress: () => console.log('OK Pressed')},]
    );
  }  
}