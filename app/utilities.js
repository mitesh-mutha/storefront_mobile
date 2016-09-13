import {Alert, AsyncStorage} from 'react-native';
import {Actions} from "react-native-router-flux";
import Strings from './strings';

module.exports = {
    showAlertWithOK: function(title, msg) {
        Alert.alert(
            title,
            msg,
            [{text: 'OK', onPress: () => console.log('OK Pressed')},]
        );
    },
    async clearLoginDetails() {
        try {
            await AsyncStorage.removeItem("login_details"); 
            Actions.otploginpage();    
        }
        catch (error) {
            this.showAlertWithOK(Strings.ERROR_STORING_AUTH_TOKEN, Strings.ERROR_STORING_AUTH_TOKEN_MSG);  
        }
    }
}