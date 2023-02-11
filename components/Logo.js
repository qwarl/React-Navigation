import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/LOGOFBI.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 20,
    borderRadius:20,
    shadowRadius:40,
  },
})
