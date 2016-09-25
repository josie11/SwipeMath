'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'

const {width, height} = require('Dimensions').get('window');

const SIZE = 10; // four-by-four grid
const CELL_SIZE = Math.floor(width * .1); //
const CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
const BORDER_RADIUS = CELL_PADDING * 10;
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
const LETTER_SIZE = Math.floor(TILE_SIZE * .70);

var BoardTiles = React.createClass({
  getInitialState() {

  },
    render() {
    return <Text id={this.props.id} style={styles.number}>{number}</Text>
  },
  randNum(num) {
    return Math.floor(Math.random() * this.props.gameProperties.goalNum);
  },
})

var styles = StyleSheet.create({
  number: {
    color: '#D6E5E3',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent',
  },
});

module.exports = TileNumber;
