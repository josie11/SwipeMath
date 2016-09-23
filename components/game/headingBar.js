'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
var {width, height} = require('Dimensions').get('window');
var SIZE = 10; // four-by-four grid
var CELL_SIZE = Math.floor(width * .1); // 20% of the screen width
var CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 10;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * .70);
var GOALNUMBER = 50;

var Buttons = React.createClass({
  render() {
    return <View style={styles.container}>
             {this.renderTiles()}
           </View>;
  },
  randNum(num) {
    return Math.floor(Math.random() * GOALNUMBER) + 1;
  },
  renderTiles() {
    var result = [];
    for (var row = 0; row < SIZE; row++) {
      for (var col = 0; col < SIZE; col++) {
        var key = row * SIZE + col;
        var letter = this.randNum(this.randNum());
        var position = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING
        };
        result.push(
          <View key={key} style={[styles.tile, position]}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
        );
      }
    }
    return result;
  },
});

var styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent',
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b3a36',
  },
  letter: {
    color: '#e9ece5',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent',
  },
});

module.exports = BoardView;

//#c0dfd9 buttons
