import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { observer } from 'mobx-react'
import { Card } from 'react-native-elements'

import { IBin } from '../models/bincount.model'
import theme from '../config/theme.config'

interface IListCardProps {
  binData: IBin
  binIndex: number
  borderStyle?: {}
  onPress: (id: number) => void
}

@observer
export default class ListCard extends React.Component<IListCardProps> {
  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.onPress(this.props.binData.id)}
        >
          <Card containerStyle={this.props.borderStyle}>
            <View style={styles.topCardContent}>
              <View style={styles.barcodeContentContainer}>
                <Text style={styles.barcodeContentLabel}>PRODUCT ID</Text>
                <Text style={styles.barcodeContentText}>
                  {this.props.binData.barcode}
                </Text>
              </View>
              <View style={styles.binIndexContainer}>
                <Text style={styles.binIndexText}>{this.props.binIndex}</Text>
              </View>
            </View>
            <View style={styles.middleCardContent}>
              <View style={styles.leftCardContent}>
                <View style={styles.newProductContentContainer}>
                  <Text style={styles.newProductContentLabel}>NEW PRODUCT</Text>
                  <Text style={styles.newProductContentText}>
                    {this.props.binData.newProduct}
                  </Text>
                </View>
              </View>
              <View style={styles.rightCardContent}>
                <View style={styles.countQtyContentContainer}>
                  <Text style={styles.countQtyContentLabel}>COUNT QTY</Text>
                  <Text style={styles.countQtyContentText}>
                    {this.props.binData.countQty
                      ? this.props.binData.countQty
                      : '0'}
                  </Text>
                </View>
                <View style={styles.addtlQtyContentContainer}>
                  <Text style={styles.addtlQtyContentLabel}>
                    ADDITIONAL QTY
                  </Text>
                  <Text style={styles.addtlQtyContentText}>
                    {this.props.binData.additionalQty
                      ? this.props.binData.additionalQty
                      : '0'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomCardContent}>
                <View style={styles.commentsContentContainer}>
                  <Text style={styles.commentsContentLabel}>COMMENTS</Text>
                  <Text style={styles.commentsContentText}>
                    {this.props.binData.comments}
                  </Text>
                </View>
              <View style={styles.imageContainer}>
                <Image
                  style={{ height: 60, width: 75 }}
                  resizeMode="contain"
                  source={require('../assets/images/splash-company-logo.png')}
                />
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topCardContent: {
    flex: 1,
    flexDirection: 'row'
  },
  middleCardContent: {
    flex: 1,
    flexDirection: 'row'
  },
  bottomCardContent: {
    flex: 1,
    flexDirection: 'row'
  },
  leftCardContent: {
    flex: 1
  },
  barcodeContentContainer: {
    paddingBottom: 10
  },
  barcodeContentLabel: {
    color: theme.colors.darkAccent
  },
  barcodeContentText: {
    fontSize: 20
  },
  newProductContentContainer: {
    paddingBottom: 10
  },
  newProductContentLabel: {
    color: theme.colors.darkAccent
  },
  newProductContentText: {},
  rightCardContent: {
    flex: 1,
    alignItems: 'flex-end'
  },
  binIndexContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  binIndexText: {
    flex: 1,
    fontSize: 40,
    color: theme.colors.primary,
    textAlign: 'right'
  },
  countQtyContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  countQtyContentLabel: {
    color: theme.colors.darkAccent,
    textAlign: 'right',
    flex: 3
  },
  countQtyContentText: {
    flex: 1,
    textAlign: 'right'
  },
  addtlQtyContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  addtlQtyContentLabel: {
    color: theme.colors.darkAccent,
    flex: 3,
    textAlign: 'right'
  },
  addtlQtyContentText: {
    flex: 1,
    textAlign: 'right'
  },
  textLabelColor: {
    color: theme.colors.darkAccent
  },
  commentsContentContainer: {
    flex: 2,
    paddingBottom: 10
  },
  commentsContentLabel: {
    color: theme.colors.darkAccent
  },
  commentsContentText: {},
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end'
  }
})
