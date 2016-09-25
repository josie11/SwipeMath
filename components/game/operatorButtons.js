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

const OperatorButtons = React.createClass({
  getInitialState() {
    let opacities = [];
    for (let i = 0; i < 4; i++) {
      opacities.push(new Animated.Value(1));
    }
    return {opacities};
  },
  render() {
    return <View style={styles.container}>
              {this.renderOpButtons()}
            </View>
  },
  renderOpButtons() {
    let opacities = this.state.opacities;
    let access = this;
    return this.props.operators.map(function(op, idx) {
      let opacity = {opacity: opacities[idx]};
      return <Animated.View key={idx} op={op} style={[styles.opButtons, opacity]} onStartShouldSetResponder={() => access.clickTile(idx, op)}><Text style={styles.opTile}>{op}</Text></Animated.View>
    });
  },
  clickTile(id, op) {
    this.props.changeOperator(op);
    this.animateTile(id);
  },
  animateTile(id) {
    let opacity = this.state.opacities[id];
    opacity.setValue(.5); // half transparent, half opaque
    Animated.timing(opacity, {
      toValue: 1, // fully opaque
      duration: 250, // milliseconds
    }).start();
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  opButtons: {
    width: opButtonWidth,
    height: opButtonWidth,
    margin: opButtonPadding,
    borderRadius: opButtonRadius,
    alignItems: 'center',
    backgroundColor: '#517664'
  },
  opTile: {
    fontSize: OpButtonLetterSize,
  },
});

module.exports = OperatorButtons;
