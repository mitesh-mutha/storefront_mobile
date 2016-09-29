const DOMAIN = "http://139.59.31.22:3000/"
//const DOMAIN = "http://192.168.2.105:3000/";

const API_BASE_URL = DOMAIN + "api/v1/";
const IMAGES_BASE_URL = DOMAIN;

const API_URL= {
  OTP_LOGIN_URL: API_BASE_URL + "customer/login",
  OTP_RELOGIN_URL: API_BASE_URL + "customer/re_login",
  OTP_VERIFICATION_URL: API_BASE_URL + "customer/authenticate",
  PRODUCT_DETAILS_URL: API_BASE_URL + "product/",
  CUSTOMER_FEED_URL: API_BASE_URL + "customer/feed",
  PRODUCT_ACTIONS_INITIAL_URL: API_BASE_URL + "product/",
  SELLER_SEARCH_URL: API_BASE_URL + "seller/search/",
  SELLER_DETAILS_URL: API_BASE_URL + "seller/",
  SELLER_PRODUCTS_URL: API_BASE_URL + "seller/", // +id+"/products"
  CUSTOMER_WISHLISTED_PRODUCTS_URL: API_BASE_URL + "customer/feed/wishlist",
  CUSTOMER_SELLERS_URL: API_BASE_URL + "customer/sellers",
  CUSTOMER_DETAILS_URL: API_BASE_URL + "customer",
  POST_ACTIONS_INITIAL_URL: API_BASE_URL + "post/",
  SELLER_ACTIONS_INITIAL_URL: API_BASE_URL + "seller/"
}

const AVATAR_URL = {
  MALE_AVATAR: "http://dl-homeimprovements.co.uk/wp-content/uploads/2015/10/male_avatar.jpg",
  FEMALE_AVATAR: "http://dl-homeimprovements.co.uk/wp-content/uploads/2015/10/female_avatar.jpg",
  GENERIC_AVATAR: "http://picture-cdn.wheretoget.it/8r0cbx-i.jpg"
}

module.exports = {
  API_BASE_URL,
  API_URL,
  IMAGES_BASE_URL,
  AVATAR_URL
}