import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'


export default function PopularBusiness() {

    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        GetBusinessList();  
    },[])
  
    const GetBusinessList =  async () => {
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), limit(10));
        const querySnapshot = await getDocs(q); 

        querySnapshot.forEach((doc) =>{
        console.log(doc.data())
        setBusinessList(prev=>[...prev, {id:doc.id, ...doc.data()}])
        })
    } 

    return (
    <View>
      <View 
        style={{
          padding:20, 
          display: 'flex', 
          flexDirection : 'row', 
          justifyContent : 'space-between', 
          alignItems : 'center',
          marginTop: 10
        }}>

        <Text 
            style={{
              paddingLeft: 20, 
              marginTop : 10, 
              fontSize : 20, 
              fontFamily : 'outfit-medium',
            }}>
            Negócios populares
        </Text>

        <Text style={{color: Colors.PRIMARY, fontFamily : 'outfit-medium'}}>Ver Tudo</Text>

      </View>

        <FlatList 
            data={businessList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
                <PopularBusinessCard 
                    key={item} // Define uma chave única para cada componente
                    business={item} //Passa o item atual como uma propriedade chamada business para o componente PopularBusinessCard. Assim, o componente PopularBusinessCard poderá acessar as informações do item para exibir seus detalhes.
                />
            )}
        />

    </View>
  )
}