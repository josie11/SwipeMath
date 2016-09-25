'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

const OperatorButtons = require('./operatorButtons.js');
const InfoButton = require('./gameInfoButton.js');
const {width, height} = require('Dimensions').get('window');

const HeaderView = React.createClass({
  render() {
    return <View style={styles.container}>
            <View style={styles.firstBox}>
              <InfoButton info={this.props.gameProperties.goalNum} title="Goal Number" />
              <InfoButton info={this.props.gameProperties.goalSwipes} title="Goal Swipes" />
              <InfoButton style={styles.score}info={this.props.gameProperties.score} title="Score" />
            </View>
            <OperatorButtons operators={this.props.gameProperties.operators} style={styles.secondBox} changeOperator={this.props.changeOperator}/>
          </View>
  },
});

const styles = StyleSheet.create({
  container: {
    height: height * .25,
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
});

module.exports = HeaderView;
