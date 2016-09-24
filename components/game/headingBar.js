'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

const OperatorButtons = require('./operatorButtons.js');

const {width, height} = require('Dimensions').get('window');


const HeaderView = React.createClass({
  render() {
    return <View style={styles.container}>
            <View style={styles.firstBox}>
              <View style={styles.goalNum}>
                <View style={styles.infoTitleBox}>
                  <Text style={styles.infoButtonTitle}>Goal Number</Text>
                </View>
                <View style={styles.infoSmallBox}>
                  <Text style={styles.infoButtonText}>{this.props.gameProperties.goalNum}</Text>
                </View>
              </View>
              <View style={styles.goalSwipes}>
                <View style={styles.infoTitleBox}>
                  <Text style={styles.infoButtonTitle}>Goal Swipes</Text>
                </View>
                <View style={styles.infoSmallBox}>
                  <Text style={styles.infoButtonText}>{this.props.gameProperties.goalSwipes}</Text>
                </View>
              </View>
              <View style={styles.score}>
                <View style={styles.infoTitleBox}>
                  <Text style={styles.infoButtonTitle}>Score</Text>
                </View>
                <View style={styles.infoSmallBox}>
                  <Text style={styles.infoButtonText}>{this.props.gameProperties.score}</Text>
                </View>
              </View>
            </View>
            <OperatorButtons operators={this.props.gameProperties.operators} style={styles.secondBox}/>
          </View>
  },
});

const styles = StyleSheet.create({
  container: {
    height: height * .3,
    flexDirection: 'column',
  },
  firstBox: {
    flex: 1,
    flexDirection: 'row',
  },
  goalNum: {
    width: width / 3
  },
  goalSwipes: {
    width: width / 3
  },
  score: {
    width: width / 3
  },
  infoTitleBox: {
  },
  infoButtonTitle: {

  },
  infoSmallBox: {
  },
  infoButtonText: {

  },
  secondBox: {
    flex: 2,
  },
});

module.exports = HeaderView;
