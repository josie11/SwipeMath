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

var Game = React.createClass({
  getInitialState() {
    let gameProperties = {
      goalNum: 15,
      goalSwipes: 2,
      score: 0,
      operators: ['+', '-', '*', '/'],
      opValues: {'+' : 2, '-' : 2, '*' : 4, '/' : 4
      },
      currentOperator: '+'
    };
    return {gameProperties};
  },
  render() {
    return <View style={styles.container}>
              <HeaderView gameProperties={this.state.gameProperties} changeOperator={this.changeOperator}/>
              <BoardView gameProperties={this.state.gameProperties} changeScore={this.changeScore} />
           </View>;
  },
  changeOperator(op) {
    this.state.gameProperties.currentOperator = op;
  },
  changeScore(points) {
    console.log(points);
    this.state.gameProperties.score += points;
    console.log(this.state.gameProperties.score)
    this.setState({gameProperties: this.state.gameProperties});
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#CACFD6',
  },
});

module.exports = Game;

