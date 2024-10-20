import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import  BusinessCardList  from './BusinessCardList'

export default function ExploreBusinessList({businessList}) {
  return (
    <View>
        <ScrollView>
            <FlatList 
                data={businessList}
                scrollEnabled
                renderItem={({item, index}) => (
                    <BusinessCardList
                        key={index}
                        business={item}
                    />
                )} 
            />
            <View 
                style={{
                    height : 200
                }}>

            </View>
        </ScrollView>
    </View>
  )
}