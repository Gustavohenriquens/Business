import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({business}) {

    const router =  useRouter();
    const {user} = useUser();

    const onDelete = () => {
      // Uma função do React Native usada para exibir uma caixa de diálogo com uma mensagem e botões de ação.
      Alert.alert('Do you want  to Delete?', 'Do you really want to Delete this business ?', [
        {
          // 'Cancel': Botão que fecha o alerta sem fazer nada. Seu estilo é definido como 'cancel'.
          text : 'Cancel',
          style : 'cancel'
        },
        {
          // 'Delete': Botão de exclusão com estilo 'destructive', que indica uma ação crítica.
          text : 'Delete',
          style : 'destructive',
          onPress:()=>deleteBusiness() //Ao ser pressionado, ele chama a função deleteBusiness para deletar o negócio.
        }
      ])
    }

    const deleteBusiness = async () => {  
      console.log("Delete Business"); // Apenas registra no console que o processo de deleção foi iniciado.
      await deleteDoc(doc(db, 'BusinessList', business?.id)); //Deleta o documento específico no Firestore usando o id do negócio (armazenado na variável business?.id).
      router.back(); //Navega de volta para a página anterior após a exclusão.
      ToastAndroid.show('Business Deleted!', ToastAndroid.LONG); // Exibe uma notificação na tela com a mensagem "Business Deleted!" por um longo período (somente em dispositivos Android).
    }

  return (
    <View>
        <View style={{
            position : 'absolute',
            zIndex : 10,
            display : 'flex',
            flexDirection : 'row',
            justifyContent  :'space-between',
            width : '100%',
            padding :20,
            paddingTop : 35
        }}>
            {/* router.back() retornará o usuário à tela ou página anterior no histórico de navegação. */}
            <TouchableOpacity onPress={() => router.back()}>  
                <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>

            <Ionicons name="heart-outline" size={40} color="white" />
        </View>
      <Image source={{uri:business?.imageUrl}} 
            style={{
                width: '100%',
                height: 340
            }}
      />

      <View style={{
        display : 'flex',
        flexDirection  : 'row',
        justifyContent : 'space-between',
        padding : 20,
        marginTop : -20,
        backgroundColor : '#fff',
        borderTopLeftRadius : 25,
        borderTopRightRadius : 25,
      }}>

      <View style={{
        padding : 20,
        marginTop : -20,
        backgroundColor : '#fff',
        borderTopLeftRadius : 25,
        borderTopRightRadius : 25
      }}>
            <Text style={{
                fontSize :26,
                fontFamily : 'outfit-bold',
            }}>{business?.name}
             
            </Text>
            <Text 
            style={{
                fontFamily: 'outfit',
                fontSize : 18
            }}>{business?.address}</Text>
      </View>

     {user?.primaryEmailAddress?.emailAddress ==  business?.userEmail&&
      <TouchableOpacity onPress={()=> onDelete()}>
        <Ionicons name="trash" size={24} color="red"/>
      </TouchableOpacity>
      }

      </View>
    </View>
  )
}