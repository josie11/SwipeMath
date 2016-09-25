'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

const OperatorButtons = require('./operatorButtons.js');
const InfoButton = require('./gameInfoButton.js');
const AdjustButton = require('./adjusterBar.js');
const {width, height} = require('Dimensions').get('window');

const HeaderView = React.createClass({
  render() {
    return <View style={styles.container}>
            <View style={styles.firstBox}>
              <View style={styles.adjustbox}>
                <InfoButton info={this.props.gameProperties.goalNum} title="Goal Number" />
                <AdjustButton changeGoal={this.props.changeGoalNum} />
              </View >
              <View style={styles.adjustbox}>
                <InfoButton info={this.props.gameProperties.goalSwipes} title="Goal Swipes" />
                <AdjustButton changeGoal={this.props.changeGoalSwipes} />
              </View>
              <InfoButton style={styles.score} info={this.props.gameProperties.score} title="Score" />
            </View>
            <OperatorButtons operators={this.props.gameProperties.operators} style={styles.secondBox} changeOperator={this.props.changeOperator} currOp={this.props.gameProperties.currentOperator} />
          </View>
  },
});

const styles = StyleSheet.create({
  container: {
    height: height * .30,
    flexDirection: 'column',
  },
  firstBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c0dfd9',
  },
  secondBox: {
    flex: 1,
  },
  adjustbox: {
    flexDirection: 'column'
  },
});

module.exports = HeaderView;
