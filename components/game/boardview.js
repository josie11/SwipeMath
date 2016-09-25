'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  PanResponder
} from 'react-native'

var {width, height} = require('Dimensions').get('window');
var SIZE = 10; // four-by-four grid
var CELL_SIZE = Math.floor(width * .1); //
var CELL_PADDING = Math.floor(CELL_SIZE * .05); // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 10;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * .70);

var BoardView = React.createClass({
  getInitialState() {
    let tilt = new Array(SIZE * SIZE);
    let tileData = new Array(SIZE * SIZE);
    for (var i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0);
      tileData[i] = {
        value : this.randNum(this.randNum()),
        swipeCount : 0,
        swipeHistoryValue : 0,
        operatorHistory : {},
        previousTiles : []
      }
    }
    return {tilt, tileData, currentSwipeCount: 0, currentSwipeIds: []};
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
        result.push(this.renderTile(key, style));
      }
    }
    return result;
  },
  renderTile(id, style) {
    return <Animated.View key={id} style={[styles.tile, style]}
                 onStartShouldSetResponder={() => this.clickTile(id)}>
           <Text style={styles.number} >{this.getTileValue(id)}</Text>
         </Animated.View>;
  },

 randNum(num) {
    return Math.floor(Math.random() * this.props.gameProperties.goalNum);
  },

  clickTile(id) {
    this.spinTile(id);
    this.setState({tileData : this.state.tileData});
  },

  mergeTiles(mergeId, mergeeId) {

  },

  //does the last swiped tile include current swiped tile as a neighbor
  isTileNeighbor(id) {
    let lastSwipedTileId = this.state.currentSwipeIds[-1];
    return neighborTiles(lastSwipedTileId).includes(id);
  }

  //get all neighbor tiles
  neighborTiles(id) {
    return [id - 10, id + 10, id - 1, id + 1].filter(function(value) {
      if(value >= 0) return value;
    });
  },

  getTileValue(id) {
    return this.state.tileData[id].value;
  },

  spinTile(id) {
    let tilt = this.state.tilt[id];
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
