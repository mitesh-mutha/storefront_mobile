import {Alert, AsyncStorage} from 'react-native';
import {Actions, ActionConst} from "react-native-router-flux";
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
            Actions.otploginpage({type: ActionConst.RESET});    
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
    },
    getSellerLogoUrl(name, logo){
        if (!logo || logo === "" || logo.length == 0) {
            index = name.indexOf(' ');
            if (index >= 0 && (index+1) < name.length ) {
                initials =  name.charAt(0) + name.charAt(index+1);
            }
            else if ( name.length >= 2 ) {
                initials = name.charAt(0)+name.charAt(1);
            }
            else {
                initials = " ";
            }
            return "https://placeholdit.imgix.net/~text?txtsize=40&bg=000000&txtclr=ffffff&txt="+initials.toUpperCase()+"&w=68&h=68&txttrack=3&txtpad=3";
        }
        else {
            return logo;
        }
    },

    async saveNotificationToken(token) {
        //console.log("In saveNotificationToken - "+token)
        try {
            await AsyncStorage.setItem("notif_token", token);
        }
        catch (error) {
            //console.log("Error in saveNotificationToken "+error)
        }
    },

    async getNotifToken() {
        try {
            value = await AsyncStorage.getItem("notif_token");
            //console.log("In getNotifToken - "+value)    
        }
        catch(error){
            //console.log("Error in saveNotificationToken "+error)
        }        
        return value;
    },
}