import {Alert, AsyncStorage} from 'react-native';
import {Actions} from "react-native-router-flux";
import Strings from './strings';
import URL from './urls';

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
    },
    informServerAboutShare(itemid, itemtype, phone, authentication_token) {
        if ( itemtype === 'product' ) {
            url = URL.API_URL.PRODUCT_ACTIONS_INITIAL_URL+itemid+"/share?"+
                "phone="+phone+"&"+
                "authentication_token="+authentication_token;
        }
        else {
            url = URL.API_URL.POST_ACTIONS_INITIAL_URL+itemid+"/share?"+
                "phone="+phone+"&"+
                "authentication_token="+authentication_token;   
        }

        fetch(url,{
            method: 'POST'
        })
        .then((response) => {})
        .catch((error) =>  {
        });
        return;
    }
}