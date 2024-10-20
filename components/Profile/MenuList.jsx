import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import {Colors} from '../../constants/Colors'
import { useRouter } from 'expo-router' 
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {
    const {signOut} = useAuth(); //Quando chamada, ela realiza a ação de logout do usuário, geralmente limpando o estado de autenticação e redirecionando o usuário para a tela de login ou uma página pública.
    const router = useRouter();
    const menuList=[ 
        // Contém uma lista de objetos, onde cada objeto representa um item de menu.
        // Cada item inclui informações sobre a funcionalidade e a navegação associada. 
        {
            id:1,
            name:'Add Business',
            icon : require('./../../assets/images/add.png'),
            path : '/business/add-business'
        },
        {
            id:2,
            name:'My Business',
            icon : require('./../../assets/images/business-and-trade.png'),
            path : '/business/my-business'
        },
        {
            id:3,
            name:'Share Business',
            icon : require('./../../assets/images/share_1.png'),
            path : 'share'
        },
        {
            id:4,
            name:'Logout',
            icon : require('./../../assets/images/logout.png'),
            path : 'logout'
        },
    ]


    const onMenuClick = (item) => {
        if(item.path=='logout'){  //Verifica se o caminho (path) do item selecionado é 'logout'.
            signOut(); //Desloga o usuário (função extraída anteriormente do hook useAuth).
            return; 
        }
        if(item.path=='share'){
            Share.share( //Se for, a função Share.share() é chamada para compartilhar uma mensagem.
                { 
                    message: 'Download the Business Directory App by Tubeguruji, Download URL:'
                }
            ) 
            return;
        }
        router.push(item.path)
    }

  return (
    <View style={{
        marginTop : 50
    }}>
      <FlatList 
        data={menuList}
        numColumns={2}
        renderItem={({item, index}) => (
            <TouchableOpacity 
            onPress={() => onMenuClick(item)}
            style={{
                display : 'flex',
                flexDirection : 'row',
                alignItems : 'center',
                gap : 10,
                flex : 1,
                padding : 10,
                borderRadius : 15,
                borderWidth : 1,
                margin : 10,
                backgroundColor : '#fff',
                borderColor : Colors.PRIMARY
            }}>
                <Image source={item.icon}
                    style={{
                        width : 50,
                        height : 50,                       
                    }}
                />
                <Text style={{
                    fontFamily : 'outfit-medium',
                    fontSize : 16,
                    flex : 1
                }}>{item.name}</Text>
            </TouchableOpacity>
        )}
      />

        <Text style={{
            fontFamily : 'outfit',
            textAlign : 'center',
            marginTop : 50,
            color : Colors.GRAY
        }}>Developed by Tubeguruji @ 2024</Text>

    </View>
  )
}