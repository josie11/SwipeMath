'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native'

const Game = require('./components/game/game.js');

const Main = React.createClass({
  render() {
    return <View style={styles.container}>
              <Game />
           </View>;
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#CACFD6',
  },
});

module.exports = Main;
