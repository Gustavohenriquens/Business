import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import {query, collection, where, doc, getDoc} from 'firebase/firestore'
import {db} from './../../configs/FirebaseConfig'
import {Colors} from '../../constants/Colors'
import Intro from '../../components/BusinessDetail/Intro'
import ActionButton from '../../components/BusinessDetail/ActionButton'
import About from '../../components/BusinessDetail/About'
import Reviews from '../../components/BusinessDetail/Reviews'

export default function BusinessDatail() {

  const {businessid} = useLocalSearchParams(); 
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => { // Está sendo usado para chamar a função GetBusinessDetailById assim que o componente for montado.
    GetBusinessDetailById();
  },[])

  //Usado para obter businessDetail por id
  const GetBusinessDetailById = async () =>{
    setLoading(true);
    const docRef = doc(db, 'BusinessList', businessid); //Aqui você está criando uma referência ao documento no Firestore. db: representa a instância do banco de dados Firestore que você está usando. 'BusinessList': é o nome da coleção no Firestore onde os documentos de negócios estão armazenados.  businessid: provavelmente é o parâmetro de busca que você obteve anteriormente com o useLocalSearchParams() e representa o ID do documento que você deseja buscar.
    const docSnap = await getDoc(docRef) //É a função que busca o documento no Firestore usando a referência docRef

    //Aqui você está verificando se o documento realmente existe.
    if (docSnap.exists()){ //O método exists() retorna true se o documento com o businessid fornecido for encontrado, caso contrário retorna false.
      setBusiness({id: docSnap.id, ...docSnap.data()});
      setLoading(false)
    } else {
      console.log("No such docuemtn!")
      setLoading(false)
    }
  }

  return (
    // Dando erro o ScrollView
    <ScrollView> 
      {loading?
      <ActivityIndicator 
      style={{
        marginTop : '70%'
      }}
      size={'large'}
      color={Colors.PRIMARY}
      /> :
      <View>
        {/* Intro */}
        <Intro business={business}/>

        {/* Action Buttons */}
        <ActionButton business={business}/>

        {/* About Section */}
        <About business={business}/>

        {/*Review Section */}
        <Reviews business={business}/>

      </View>
    }

    </ScrollView>
  )
}