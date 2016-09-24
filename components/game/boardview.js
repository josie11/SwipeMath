'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native'

var {width, height} = require('Dimensions').get('window');
var SIZE = 10; // four-by-four grid
var CELL_SIZE = Math.floor(width * .1); //
var CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 10;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * .70);
var GOALNUMBER = 50;

var BoardView = React.createClass({
  getInitialState() {
    var tilt = new Array(SIZE * SIZE);
    for (var i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0);
    }
    return {tilt};
  },
  render() {
    return <View style={styles.container}>
      {this.renderTiles()}
    </View>;
  },
  renderTiles() {
    var result = [];
    for (var row = 0; row < SIZE; row++) {
      for (var col = 0; col < SIZE; col++) {
        var key = row * SIZE + col;
        var number = this.randNum(this.randNum());
        var tilt = this.state.tilt[key].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        });
        var style = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING,
          transform: [{perspective: CELL_SIZE * 8},
                      {rotateZ: tilt}],
        };
        result.push(this.renderTile(key, style, number));
      }
    }
    return result;
  },
  renderTile(id, style, number) {
    return <Animated.View key={id} style={[styles.tile, style]}
                 onStartShouldSetResponder={() => this.clickTile(id)}>
           <Text style={styles.number}>{number}</Text>
         </Animated.View>;
  },
 randNum(num) {
    return Math.floor(Math.random() * GOALNUMBER) + 1;
  },
  clickTile(id) {
    var tilt = this.state.tilt[id];
    tilt.setValue(1); // mapped to -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start();
  },
});

var styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: '#9FD8CB',
    borderRadius: BORDER_RADIUS,
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#517664',
  },
  number: {
    color: '#D6E5E3',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent',
  },
});

module.exports = BoardView;

//#c0dfd9 buttons
