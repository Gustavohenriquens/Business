import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function CategoryItem({category, onCategoryPress}) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>      
        <View 
            style={{
                padding : 15,
                backgroundColor : Colors.CARD_COLOR,
                borderRadius : 99,
                marginRight : 10,
                marginLeft : 10
            }}>
            <Image source={{uri:category.icon}}
                style={{
                    width:35,
                    height : 35
                }}
            />
        </View>

        <Text 
            style={{
                fontSize : 12,
                fontFamily : 'outfit-medium',
                textAlign : 'center',
                marginTop : 5,
            }}>{category.name}
        </Text>

    </TouchableOpacity>
  )
}