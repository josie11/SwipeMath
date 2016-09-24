'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native'

const {width, height} = require('Dimensions').get('window');

const opButtonAmt = 4;
const opButtonWidth = Math.floor(width * .2);
const opButtonPadding = Math.floor(opButtonWidth * .1); // 5% of the cell size
const opButtonRadius = opButtonPadding * 4;
const opButtonSize = opButtonWidth - opButtonPadding * 2;
const OpButtonLetterSize = Math.floor(opButtonWidth * .70);


var HeaderView = React.createClass({
  render() {
    return <View style={styles.container}>
            <View style={styles.firstBox}>
              <View style={styles.goalNum}>
                <View style={styles.infoTitleBox}>
                  <Text style={styles.infoButtonTitle}>Goal Number</Text>
                </View>
                <View style={styles.infoSmallBox}>
                  <Text style={styles.infoButtonText}></Text>
                </View>
              </View>
              <View style={styles.goalSwipes}>
                <View style={styles.infoTitleBox}>
                  <Text style={styles.infoButtonTitle}>Goal Swipes</Text>
                </View>
                <View style={styles.infoSmallBox}>
                  <Text style={styles.infoButtonText}></Text>
                </View>
              </View>
            </View>
            <View style={styles.secondBox}>
                <View style={styles.opButtons}><Text style={styles.opTile}>+</Text></View>
                <View style={styles.opButtons}><Text style={styles.opTile}>-</Text></View>
                <View style={styles.opButtons}><Text style={styles.opTile}>*</Text></View>
               <View style={styles.opButtons}><Text style={styles.opTile}>/</Text></View>
            </View>
          </View>
  },
  renderOpButton() {
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
    width: width / 2
  },
  goalSwipes: {
    width: width / 2
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
    flex: 1,
    flexDirection: 'row',
  },
  opButtons: {
    width: opButtonWidth,
    height: opButtonWidth,
    margin: opButtonPadding,
    backgroundColor: '#c0dfd9',
    borderRadius: opButtonRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opTile: {
    fontSize: OpButtonLetterSize,
  },
});

module.exports = HeaderView;
