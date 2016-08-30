'use strict';

var React = require('react-native');
var {AppRegistry} = React;
import Storefront from './Storefront';

console.ignoredYellowBox = [
    'Circular indeterminate', 
    'Warning: Failed prop type: Invalid props.style key `resizeMode` supplied'
]

AppRegistry.registerComponent('Storefront', () => Storefront);