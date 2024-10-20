import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import {Colors} from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
    const {user} = useUser(); //acessa informações do usuário autenticado.

  return (
    <View style={{
        padding : 20,
        paddingTop : 50,
        backgroundColor : Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius : 20
    }}>
      <View style={{
        display : 'flex',
        flexDirection  :'row',
        alignItems : 'center',
        gap : 10
      }}>
            <Image  source={{uri:user?.imageUrl}} //Acessa a imagem do usaurio logado, o "Conta do Google"
                style={{
                    width: 45,
                    height : 45,
                    borderRadius : 99
                }}
            />
            <View>
                <Text style={{
                    color : '#fff'
                }}>Bem Vindo,</Text>
                <Text style={{
                    fontSize : 19,
                    color : '#fff',
                    fontFamily : 'outfit-medium'
                }}>{user?.fullName}</Text> 
            </View>
      </View>

       {/* Search Bar  */}

      <View 
        style={{
          display : 'flex',
          flexDirection : 'row',
          gap : 10,
          alignItems : 'center',
          backgroundColor : '#fff',
          padding : 10,
          marginVertical : 10,
          marginTop : 15,
          borderRadius : 8
        }}>
            <Ionicons name="search" size={24} color={Colors.PRIMARY} />
            <TextInput
                placeholder='Procurar...'
                style={{
                    fontFamily : 'outfit',
                    fontSize : 16   
                }}
            />
      </View>
    </View>
  )
}