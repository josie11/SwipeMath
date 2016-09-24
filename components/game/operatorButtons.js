'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

const {width, height} = require('Dimensions').get('window');

const opButtonAmt = 4;
const opButtonWidth = Math.floor(width * .2);
const opButtonPadding = Math.floor(opButtonWidth * .1); // 5% of the cell size
const opButtonRadius = opButtonPadding * 4;
const opButtonSize = opButtonWidth - opButtonPadding * 2;
const OpButtonLetterSize = Math.floor(opButtonWidth * .70);

const OperatorButtons = React.createClass({
  render() {
    return <View style={styles.container}>
                <View style={styles.opButtons}><Text style={styles.opTile}>+</Text></View>
                <View style={styles.opButtons}><Text style={styles.opTile}>-</Text></View>
                <View style={styles.opButtons}><Text style={styles.opTile}>*</Text></View>
               <View style={styles.opButtons}><Text style={styles.opTile}>/</Text></View>
            </View>
  },
  renderOpButton() {
  },
});

const styles = StyleSheet.create({
  container: {
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

module.exports = OperatorButtons;
