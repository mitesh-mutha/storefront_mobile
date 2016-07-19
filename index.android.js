'use strict';

var React = require('react-native');
var {AppRegistry} = React;
import Storefront from './Storefront';

console.ignoredYellowBox = ['Circular indeterminate']

AppRegistry.registerComponent('Storefront', () => Storefront);