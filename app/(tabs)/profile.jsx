import { View, Text } from 'react-native'
import React from 'react'
import IntroUser from '../../components/Profile/IntroUser'
import MenuList from '../../components/Profile/MenuList'



export default function profile() {
  return (
    <View style={{
      padding : 30
    }}>
      <Text 
        style={{
          fontFamily : 'outfit-bold',
          fontSize : 25
        }}>
        Profile
      </Text>

        {/* User Info */}   
      <IntroUser/>

        {/* Menu List */}
        <MenuList/>

    </View>
  )
}