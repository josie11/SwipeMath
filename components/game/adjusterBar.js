'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native'

const {width, height} = require('Dimensions').get('window');

const AdjustButton = React.createClass({
  render() {
    return <View style={styles.container}>
      {this.renderButton()}
    </View>
  },
  renderButton() {
    let access = this;
    return ['-', '+'].map(function(op){
      return <TouchableWithoutFeedback key={op} onPress={() => access.onButtonClick(op)}>
        <Text style={styles.text} > {op} </Text>
      </TouchableWithoutFeedback>
    })
  },
  onButtonClick(op) {
    let num = op === '-' ? -1 : 1;
    this.props.changeGoal(num);
  }

})

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
  }
})

module.exports = AdjustButton;
