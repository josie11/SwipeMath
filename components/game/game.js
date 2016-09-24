'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native'

const BoardView = require('./boardview.js');
const HeaderView = require('./headingBar.js');
//has operators
const operators = ['+', '-', '*', '/'];

var Game = React.createClass({
  render() {
    return <View style={styles.container}>
              <HeaderView />
              <BoardView />
           </View>;
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#CACFD6',
  },
});

module.exports = Game;

