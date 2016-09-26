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

const Game = React.createClass({
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
              <HeaderView gameProperties={this.state.gameProperties} changeOperator={this.changeOperator} changeGoalNum={this.changeGoalNum} changeGoalSwipes={this.changeGoalSwipes} />
              <BoardView newGame={this.newGame} gameProperties={this.state.gameProperties} changeScore={this.changeScore} />
           </View>;
  },
  changeOperator(op) {
    this.state.gameProperties.currentOperator = op;
  },
  changeScore(points) {
    this.state.gameProperties.score += points;
    this.changeState();
  },
  changeGoalNum(num) {
    let newNum = this.state.gameProperties.goalNum + num;
    this.state.gameProperties.goalNum = newNum < 1 ? 1 : newNum;
    this.changeState();
  },
  changeGoalSwipes(num) {
    let newNum = this.state.gameProperties.goalSwipes + num;
    this.state.gameProperties.goalSwipes = newNum < 1 ? 1 : newNum;
    this.changeState();
  },
  newGame() {
    this.state.gameProperties.goalNum = 15;
    this.state.gameProperties.goalSwipes = 2;
    this.state.gameProperties.score = 0;
    this.state.gameProperties.currentOperator = '+';
    this.changeState();
  },
  changeState() {
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

