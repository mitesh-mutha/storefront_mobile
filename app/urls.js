const API_BASE_URL = "http://192.168.2.105:3000/api/v1/";

const API_URL= {
  OTP_LOGIN_URL: API_BASE_URL+"customer/login",
  OTP_VERIFICATION_URL: API_BASE_URL+"customer/authenticate"
}

module.exports = {
  API_BASE_URL,
  API_URL
}