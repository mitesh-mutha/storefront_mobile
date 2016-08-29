const DOMAIN = "http://139.59.31.22:3000/"
//const DOMAIN = "http://192.168.2.105:3000/";

const API_BASE_URL = DOMAIN+"api/v1/";
const IMAGES_BASE_URL = DOMAIN;

const API_URL= {
  OTP_LOGIN_URL: API_BASE_URL+"customer/login",
  OTP_VERIFICATION_URL: API_BASE_URL+"customer/authenticate",
  PRODUCT_DETAILS_URL: API_BASE_URL+"product/",
  CUSTOMER_FEED_URL: API_BASE_URL+"customer/feed"
}

module.exports = {
  API_BASE_URL,
  API_URL,
  IMAGES_BASE_URL
}