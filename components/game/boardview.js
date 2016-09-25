'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  PanResponder
} from 'react-native';

import classnames from 'classnames';


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
        value : this.randNum(),
        swipeCountValue : 0,
        active: false
      }
    }
    return {tilt, tileData, currentSwipeIds: []};
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
    let tileColor = this.tileStateStlye(id);
    return <Animated.View key={id} style={[styles.tile, style, tileColor]}
                 onStartShouldSetResponder={() => this.clickTile(id)}>
           <Text style={styles.number} >{this.getTileValue(id)}</Text>
         </Animated.View>;
  },

 randNum() {
    return Math.floor(Math.random() * this.props.gameProperties.goalNum - 1) + 1;
  },

  clickTile(id) {
    this.spinTile(id);
    this.executeSwipe(id);
    this.setState({tileData : this.state.tileData});
  },

  //if first move, just addtoboard
  //else initiate tile merge
  executeSwipe(id) {
    if(this.boardSwipeCount() === 0) {
      this.changeActiveTile(id);
      this.addBoardSwipeId(id);
    } else if(this.lastSwipedTileId() !== id) {
      this.changeActiveTile(id);
      this.startTileMerge(id);
    } else {
      this.refreshBoardSwipe(true);
    }
  },

  //check if valid merge via location
  //yes: merge
  //no: trigger swipe count refresh
  startTileMerge(id) {
    if(this.isTileNeighbor(id)) {
      this.tileMerge(id);
      this.addBoardSwipeId(id);
      this.checkBoardSwipeCount();
      this.setState({tileData : this.state.tileData});
    } else {
      this.addBoardSwipeId(id);
      this.refreshBoardSwipe();
    }
  },

  //combine swipe counts of tiles
  tileMerge(id) {
    let lastSwipedId = this.lastSwipedTileId(), operator = this.props.gameProperties.currentOperator;
    let val1 = this.getTileValue(lastSwipedId), val2 = this.getTileValue(id);
    let newTileValue = this.doMath(val1, operator, val2);
    let newSwipeCount = this.getTileSwipeCount(lastSwipedId) + 1;
    this.updateTile(id, newTileValue, newSwipeCount);
    this.resetTile(lastSwipedId);
  },

  doMath(val1, op, val2) {
    let operators = {
      '+': function(num1, num2) { return num1 + num2; },
      '-': function(num1, num2) { return num1 - num2; },
      '/': function(num1, num2) { return num1 / num2; },
      '*': function(num1, num2) { return num1 * num2; }
    }
    return Math.abs(Math.floor(operators[op](val2, val1)));
  },

  //swipecount to zero, new tile
  updateTile(id, value, swipeCount) {
    this.state.tileData[id].value = value;
    this.state.tileData[id].swipeCountValue += swipeCount;
  },
  resetTile(id) {
    this.state.tileData[id].value = this.randNum(this.randNum());
    this.state.tileData[id].swipecountValue = 0;
  },
  //check if board swipes === goal swipes
  //check if board swipes exceeds goal swipes
  //triggers update, with last id as first id
  checkBoardSwipeCount() {
    let boardSwipeCount = this.boardSwipeCount() - 1;
    let goalSwipes = this.props.gameProperties.goalSwipes;
    if(boardSwipeCount === goalSwipes) this.checkForGoalNum();
  },

  checkForGoalNum() {
    let lastSwipedId = this.lastSwipedTileId();
    let value = this.getTileValue(lastSwipedId);
    if(value === this.props.gameProperties.goalNum) {
      this.props.changeScore(this.getTileSwipeCount(lastSwipedId));
      this.resetTile(lastSwipedId);
      this.refreshBoardSwipe(true);
    } else {
      this.refreshBoardSwipe(false);
      this.updateTile(lastSwipedId, this.getTileValue(lastSwipedId), 0);
    }
  },

  refreshBoardSwipe(opt) {
    if(opt) {
      this.changeActiveTile();
      this.state.currentSwipeIds = [];
    } else {
      this.state.currentSwipeIds = [this.lastSwipedTileId()];
    }
  },

  //does the last swiped tile include current swiped tile as a neighbor
  isTileNeighbor(id) {
    let lastSwipedTileId = this.lastSwipedTileId();
    return this.neighborTiles(lastSwipedTileId).includes(id);
  },

  lastSwipedTileId() {
    return this.state.currentSwipeIds[this.state.currentSwipeIds.length - 1];
  },

  //get all neighbor tiles
  neighborTiles(id) {
    return [id - 10, id + 10, id - 1, id + 1].filter(function(value) {
      if(value >= 0) return value;
    });
  },

  addBoardSwipeId(id) {
    this.state.currentSwipeIds.push(id);
  },

  getTileValue(id) {
    return this.state.tileData[id].value;
  },

  getTileSwipeCount(id) {
    return this.state.tileData[id].swipeCountValue;
  },

  boardSwipeCount() {
    return this.state.currentSwipeIds.length;
  },

  //does spin animation
  spinTile(id) {
    let tilt = this.state.tilt[id];
    tilt.setValue(1); // mapped to -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start();
  },
  changeActiveTile(id) {
    let lastSwipedId = this.lastSwipedTileId();
    if(lastSwipedId) this.state.tileData[lastSwipedId].active = !this.state.tileData[lastSwipedId].active;
    if(id) this.state.tileData[id].active = !this.state.tileData[id].active;
  },
  tileStateStlye(id) {
    let color = this.state.tileData[id].active ? 'red' : '#517664';
    return {backgroundColor : color};
  }
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
  },
  number: {
    color: '#D6E5E3',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent',
  },
});

module.exports = BoardView;

//#c0dfd9 buttons
