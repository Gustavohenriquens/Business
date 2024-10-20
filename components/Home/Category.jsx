import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'

export default function Category({explore=false, onCategorySelect}) {

  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter(); //Permite acessar e manipular o roteamento de páginas em um aplicativo

     useEffect(() =>{
      GetCategoryList()
     },[])

    const GetCategoryList = async() => {
      setCategoryList([])
      const q =query(collection(db, 'Category'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) =>{
        console.log(doc.data())
        setCategoryList(prev=>[...prev, doc.data()])
      })
    }

    const onCategoryPressHandler = (item) => {
      if(!explore){
        router.push('/businesslist/' + item.name)
      }else {
        onCategorySelect(item.name);
      }
    }

  return (
    <View>
      {!explore && <View 
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
            Categoria
        </Text>

        <Text style={{color: Colors.PRIMARY, fontFamily : 'outfit-medium'}}>Ver Tudo</Text>
      </View>}


          <FlatList 
            data={categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginLeft : 30}}
            renderItem={({item, index}) => (
              <CategoryItem 
                category={item} 
                key={index}
                //onCategoryPress =  é executada quando uma categoria é pressionada.
                //onCategoryPress = {(category) => router.push('/businesslist/' + item.name)} //O método router.push() é usado para navegar para uma nova rota. 
                onCategoryPress = {(category) => onCategoryPressHandler(item )}
              /> 
            )}            
          />

    </View>
  )
}