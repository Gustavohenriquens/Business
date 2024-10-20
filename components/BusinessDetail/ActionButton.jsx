import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'

export default function ActionButton({business}) {
    const actionButtonMenu = [ //Define um array de objetos chamado actionButtonMenu, que parece ser usado para exibir um menu de botões de ação
        {
            id:1,
            name:'Call',
            icon :require('./../../assets/images/call.png'),
            url : 'tel:' + business?.contact
        },
        {
            id:2,
            name:'Location',
            icon : require('./../../assets/images/pin.png'),
            url : 'https://www.google.com/maps/search/?api=1&query=' + business?.address
        },
        {
            id:3,
            name:'Web',
            icon :require( './../../assets/images/web.png'),
            url : business?.website
        },
        {
            id:4,
            name:'Share',
            icon : require('./../../assets/images/share.png'),
            url : business?.website
        },
    ]

    const OnPressHandle = (item) => { //A função recebe um parâmetro chamado item, que representa o objeto que foi clicado (provavelmente um item de uma lista).
        if(item?.name == 'Share'){ // Verifica se o nome (name) do item é igual a 'Share'. Se for, ela retorna imediatamente, o que significa que nada acontece quando o item 'Share' é pressionado.
            Share.share({ // O Share permite compartilhar conteúdo de texto com outros aplicativos, como aplicativos de mensagens, e-mail ou redes sociais.
                
                //O campo message contém a mensagem que será compartilhada.
                message:business?.name+"\n Address:"+business.address+"\n Find more details on Business Directory App by Tubeguruji !"
            })
            return;
        }
        Linking.openURL(item?.url); //Caso o nome do item não seja 'Share', a função "tenta abrir a URL associada ao item", utilizando o módulo Linking do React Native.
    }

  return (
    <View style={{
        backgroundColor:"#fff",
        padding : 20
    }}>
      <FlatList 
        data={actionButtonMenu}
        numColumns={4} //Define o número de colunas que a FlatList deve exibir.
        columnWrapperStyle={{justifyContent :'space-between'}} //Aplica um estilo à linha de itens da FlatList
        renderItem={({item, index}) => (
            <TouchableOpacity key={index} onPress={() => OnPressHandle(item)}>
                <Image source={item?.icon}
                    style={{
                        width:50,
                        height: 50
                    }}
                />
                <Text style={{
                    fontFamily: 'outfit-medium',
                    textAlign : 'center',
                    marginTop : 3
                }}>{item?.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}