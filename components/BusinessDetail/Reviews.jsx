import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../../constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({business}) {

    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState(); //Um estado que armazena o comentário fornecido pelo usuário.
    const {user} = useUser(); //user: Obtido do hook useUser do Clerk, representa o usuário autenticado.


    //
    const onSubmit = async () => { //A função onSubmit é acionada quando o usuário submete uma avaliação.
        const docRef = doc(db, 'BusinessList', business?.id) // Criando uma referência ao documento específico na coleção BusinessList no Firestore
        await updateDoc(docRef, {   //Atualiza o documento no Firestore, especificamente o campo reviews
            reviews : arrayUnion({
                rating:rating, //A classificação fornecida pelo usuário 
                comment: userInput, //O comentário fornecido pelo usuário, armazenado no estado userInput.
                userName : user?.fullName, //O nome completo do usuário autenticado (user?.fullName
                userImage : user?.imageUrl, //A URL da imagem de perfil do usuário (user?.imageUrl).
                userEmail : user?.primaryEmailAddress?.emailAddress //userEmail: O e-mail principal do usuário
            })
        })
        //o método ToastAndroid.show exibe uma notificação temporária no dispositivo Android, confirmando que o comentário foi adicionado.
        ToastAndroid.show('Comment Added Successfully !', ToastAndroid.BOTTOM) 
    }

  return (
    <View style={{
        padding : 20,
        backgroundColor : '#fff',
    }}>
      <Text style={{
        fontFamily  : 'outfit-bold',
        fontSize : 20
      }}>Reviews</Text>

        <View>
            <Rating //Um componente para o usuário fornecer uma classificação. //Quando o usuário termina de dar uma classificação, o valor é armazenado no estado rating.
                showRating={false}
                imageSize={25}
                onFinishRating={(rating) => setRating(rating)} // É executada quando o usuário finaliza a seleção de uma avaliação 
                style={{ paddingVertical: 10 }}
            />
            <TextInput 
                placeholder='Write your comment'
                numberOfLines={5} 
                onChangeText={(value) => setUserInput(value)}
                style={{
                    borderWidth : 1,
                    padding : 10,
                    borderRadius : 10,
                    borderColor : Colors.GRAY,
                    justifyContent : 'flex-start',
                    textAlignVertical : 'top'
                }}
            />
            <TouchableOpacity 
            disabled={!userInput}
            onPress={() => onSubmit()} //Se o usuário tiver digitado um comentário, o botão fica ativo e, ao pressioná-lo, chama a função onSubmit para enviar a avaliação.
            style={{
                padding : 10,
                backgroundColor : Colors.PRIMARY,
                borderRadius : 6,
                marginTop  :10
            }}>
                <Text style={{
                    fontFamily : 'outfit',
                    color : '#fff',
                    textAlign : 'center'
                }}>Submit</Text>
            </TouchableOpacity>
        </View>

        {/* Display Previous Reviews */}
        <View>
    {business?.reviews && business.reviews.length > 0 ? (
        business.reviews.map((item, index) => ( //Se houver avaliações, elas serão mapeadas e renderizadas. 
            <View
                key={index}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    padding: 10,
                    borderWidth: 1,
                    borderColor: Colors.GRAY,
                    borderRadius: 15,
                    marginTop: 10,
                }}
            >
                <Image
                    source={{ uri: item.userImage }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 99,
                    }}
                />
                <View
                    style={{
                        display: 'flex',
                        gap: 5,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'outfit-medium',
                        }}
                    >
                        {item.userName}
                    </Text>
                    <Rating
                        imageSize={25}
                        ratingCount={item.rating}
                        style={{ alignItems: 'flex-start' }}
                    />
                    <Text>{item.comment}</Text>
                </View>
            </View>
        ))
    ) : (
        <Text>No reviews available yet.</Text>
    )}
</View>

    </View>
  )
}