'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'

const {width, height} = require('Dimensions').get('window');

const BoxWidth = width / 3;
const ButtonPadding = Math.floor(BoxWidth * .1); // 5% of the cell size
const ButtonSize = BoxWidth - ButtonPadding * 2;
const ButtonLetterSize = Math.floor(BoxWidth * .1)

const InfoButton = React.createClass({
  render() {
    return <View style={styles.container}>
            <View style={styles.infoBox}>
              <View style={styles.infoTitleBox}>
                <Text style={styles.infoButtonTitle}>{this.props.title}</Text>
              </View>
              <View style={styles.infoSmallBox}>
                <Text style={styles.infoButtonText}>{this.props.info}</Text>
              </View>
            </View>
          </View>
    },
})


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  infoBox: {
    width: BoxWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  infoTitleBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonTitle: {
    fontSize: 20,
  },
  infoSmallBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonText: {
    fontSize: 30,
  },
})

module.exports = InfoButton;
