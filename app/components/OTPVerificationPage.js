import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import {Actions, ActionConst} from "react-native-router-flux";
import URL from './../urls';
import Spinner from 'react-native-loading-spinner-overlay';
import utility from './../utilities';
import Strings from './../strings';
import SmsListener from 'react-native-android-sms-listener';

var subscription;

var OTPVerificationPage = React.createClass({

    getInitialState() {
        return {
            otpText: '',
            spinnerVisible: false
        }
    },

    validateOTPInput() {
        if (!this.state.otpText) {
            utility.showAlertWithOK(Strings.NO_OTP_INPUT, Strings.NO_OTP_INPUT_MSG);
            return false;
        }

        if ( !this.state.otpText.trim() ) {
            utility.showAlertWithOK(Strings.NO_OTP_INPUT, Strings.NO_OTP_INPUT_MSG);
            return false; 
        }
        return true;
    },

    async saveAuthenticationToken(auth_token) {
        try {

            await AsyncStorage.setItem("login_details", JSON.stringify({
                'phone': this.props.mobileNumber,
                'authentication_token': auth_token
            }));
            
        }
        catch (error) {
            utility.showAlertWithOK(Strings.ERROR_STORING_AUTH_TOKEN, Strings.ERROR_STORING_AUTH_TOKEN_MSG);  
        }
    },

    async onVerifyButtonPress(autoRead) {
    
        if ( !this.validateOTPInput() )
            return;

        if (this.props.tracker) {
            if (autoRead)
                this.props.tracker.trackEvent('OTPVerificationPage','OTP Auto Read');
            else
                this.props.tracker.trackEvent('OTPVerificationPage','Click - Verify'); 
        }

        notifToken = await utility.getNotifToken();
        if (notifToken) {
            url = URL.API_URL.OTP_VERIFICATION_URL + "?"+
            "phone="+this.props.mobileNumber+
            "&otp="+this.state.otpText+
            "&notification_id="+notifToken;
        }
        else {
            url = URL.API_URL.OTP_VERIFICATION_URL + "?"+
            "phone="+this.props.mobileNumber+
            "&otp="+this.state.otpText;
        }        

        this.setState({spinnerVisible: true});

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {      

            if (responseJson.status === "success") {
                if (responseJson.authentication_token) {
                    this.saveAuthenticationToken(responseJson.authentication_token);
                    Actions.feedpage({
                        'phone': this.props.mobileNumber, 
                        'authentication_token': responseJson.authentication_token, 
                        type: ActionConst.RESET
                    });
                }
                else {
                    this.setState({spinnerVisible: false});
                    utility.showAlertWithOK(Strings.NO_TOKEN_IN_RESPONSE, Strings.NO_TOKEN_IN_RESPONSE_MSG);  
                }
            }
            else if (responseJson.status === "Unauthenticated") {
                if (this.props.tracker) {
                    this.props.tracker.trackEvent('OTPVerificationPage','Incorrect OTP Entered'); 
                }
                this.setState({spinnerVisible: false});
                utility.showAlertWithOK(Strings.OTP_AUTHENTICATE_INCORRECT, Strings.OTP_AUTHENTICATE_INCORRECT_MSG);

            }
            

        })
        .catch((error) =>  {
            if (this.props.tracker) {
                this.props.tracker.trackEvent('OTPVerificationPage','Authenticate Request Failed',{label:this.state.mobileInput}); 
            }

            this.setState({spinnerVisible: false});
            utility.showAlertWithOK(Strings.OTP_AUTHENTICATE_REQUEST_FAILED, Strings.OTP_AUTHENTICATE_REQUEST_FAILED_MSG);
            console.error(error)

        });

    },

    resendOTP() {
        url = URL.API_URL.OTP_RELOGIN_URL+"?phone="+this.props.mobileNumber;

        this.setState({spinnerVisible: true});

        if (this.props.tracker) {
            this.props.tracker.trackEvent('OTPVerificationPage','Resend OTP');   
        }

        fetch(url,{
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({spinnerVisible: false});

            if (responseJson.status === "success") {
                utility.showAlertWithOK(Strings.SUCCESS, Strings.OTP_RESENT);
            }
            else  {
                utility.showAlertWithOK(Strings.OTP_LOGIN_REQUEST_FAILED, Strings.OTP_LOGIN_REQUEST_FAILED_MSG);    
            }

        })
        .catch((error) =>  {
            this.setState({spinnerVisible: false});
            Utility.showAlertWithOK(Strings.OTP_LOGIN_REQUEST_FAILED, Strings.OTP_LOGIN_REQUEST_FAILED_MSG);
        });
    },

    differentNumber() {
        if (this.props.tracker) {
            this.props.tracker.trackEvent('OTPVerificationPage','Different Number',{label: this.props.mobileNumber});
        }
        Actions.otploginpage()
    },

    render(){
        return (
            <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={true}>

                <Spinner visible={this.state.spinnerVisible} />

                <View style={styles.appNameContainer}>
                    <Text style={styles.appName}>{Strings.APP_NAME}</Text>
                </View>

                <View style={styles.OTPVerificationContainer}>
              
                    <Text style={styles.OTPInstructionsText}>{Strings.OTP_SENT_TO}</Text>
              
                    <Text style={styles.OTPMobileNumText} onPress={()=>Actions.otploginpage()}>{this.props.mobileNumber}</Text>
              
                    <TextInput
                        placeholder="OTP"
                        keyboardType="numeric"
                        underlineColorAndroid='rgba(67, 164, 229, 1)'
                        style={styles.OTPInput}
                        onChangeText={(value) => this.setState({otpText:value})}
                        value={this.state.otpText}/>
              
                    <TouchableOpacity style={styles.signInButton} 
                        onPress={()=>this.onVerifyButtonPress()}>
                        <Text style={styles.signInButtonLabel}>{Strings.SIGN_IN}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.resendOTP()}>
                        <Text style={styles.OTPOptionButton}>{Strings.RESEND_OTP}</Text>
                    </TouchableOpacity>
              
                    <TouchableOpacity onPress={()=>this.differentNumber()}>
                        <Text style={styles.OTPOptionButton}>{Strings.DIFFERENT_NUMBER}</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        )
    },

    componentDidMount() {
        if (this.props.tracker){
            this.props.tracker.trackScreenView('OTPVerificationPage');
        }
    
        var that = this;
    
        subscription = SmsListener.addListener(function(message){
            verificationCodeRegex = /Your Storefront verification code: ([\d]{6})/gi;
      
            if (verificationCodeRegex.test(message.body)) {
                var verificationCode = message.body.match(verificationCodeRegex)[0];
                
                if (typeof(verificationCode) !== 'undefined') {
                    verificationCode = verificationCode.slice(-6);                    
                    that.setState({otpText: verificationCode},
                        function(){
                            that.onVerifyButtonPress(true);        
                        }
                    );
                    
                }
            }
        });
    
    },

    componentWillUnmount() {
        subscription.remove();
    }
});


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,        
        backgroundColor: "white",
    },
    appNameContainer: {
        padding: 8,
        alignSelf: 'center',
        marginTop: 48
    },
    appName: {
        fontSize: 32,
        fontFamily: 'HelveticaNeueMed',
        color: 'rgba(67, 164, 229, 1)'
    },
    OTPVerificationContainer: {
        flex:1,
        margin: 16, 
        marginTop: 24,
        backgroundColor: 'white'
    },
    OTPInstructionsText: {
        flex:1, 
        color:'black',
        fontFamily: 'HelveticaNeueMed', 
        alignSelf:'center'
    },
    OTPMobileNumText: {
        flex:1, 
        color:'black',
        fontFamily: 'HelveticaNeueMed', 
        alignSelf:'center', 
        fontSize:20
    },
    OTPInput: {
        flex:1, 
        marginTop:16
    },
    signInButton: {
        flex:1, 
        backgroundColor:'rgba(67, 164, 229, 1)', 
        alignItems:'center', 
        height: 16, 
        marginTop:16
    },
    signInButtonLabel: {
        flex:1, 
        color:'white', 
        fontFamily:'HelveticaNeueMed',
        margin:8
    },
    OTPOptionButton: {
        flex:1, 
        color:'rgba(67, 164, 229, 1)', 
        alignSelf:'center', 
        textDecorationLine: 'underline', 
        textDecorationStyle: 'solid',
        marginTop: 8
    }
});

module.exports = OTPVerificationPage