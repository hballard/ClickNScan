import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera'

import theme from '../config/theme.config'

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Text>Opening Scanner</Text>
  </View>
)

interface IBarcodeScannerProps {
  toggleBarcodeScanner: () => void
  setBarcodeText: (text: string) => void
}

export default class BarcdeScanner extends Component<IBarcodeScannerProps> {
  constructor(props: IBarcodeScannerProps) {
    super(props)

    this.onBarCodeRead = this.onBarCodeRead.bind(this)
  }

  onBarCodeRead(event: any) {
    this.props.setBarcodeText(event.data)
    this.props.toggleBarcodeScanner()
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          onBarCodeRead={this.onBarCodeRead}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        >
          {({ status }) => {
            if (status !== 'READY') {
              return <PendingView />
            }
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.toggleBarcodeScanner()
                  }}
                  style={styles.cancelButton}
                >
                  <Text style={{ fontSize: 14 }}> Cancel </Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </RNCamera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cancelButton: {
    flex: 0,
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})
