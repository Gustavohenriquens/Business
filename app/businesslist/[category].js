import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import BusinesListCard from '../../components/BusinessList/BusinessListCard'
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {

  const navigation = useNavigation();
  const {category}  = useLocalSearchParams(); //Está pegando os parâmetros da URL ou da rota atual (no contexto de navegação). Nesse caso, ela está extraindo o parâmetro category.

  const [businessList, setBusinessList] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBusinessList([])
    navigation.setOptions({
      headerShown:true, //Serve para colocar o header da pagina
      headerTitle : category //Esta pegando o nome da rota
    });
    getBusinessList()
  },[]);

  /*
    Use to get business list by category 
  */
  const getBusinessList = async () => {
    setLoading(true)
    const q = query(collection(db, 'BusinessList'), where("category", "==", category)); //Serve para consultar documentos de uma coleção com base em uma condição específica.
    const querySnapshphot = await getDocs(q);
    
    querySnapshphot.forEach((doc) => {
      console.log(doc.data())
      setBusinessList(prev => [...prev, {id:doc?.id, ...doc.data()}]) //...prev usa o spread operator para copiar todos os elementos do estado anterior prev (que é uma array).
    });
    setLoading(false);
  }

  return (
    <View>
    {businessList?. length > 0 && loading==false?   //Caso o tamanho da lista seja maior que zero, ele renderiza a lista ...
      <FlatList
        data={businessList}
        onRefresh={getBusinessList} //Esse é o callback que será chamado quando o usuário puxar a tela para baixo para atualizar a lista.
        refreshing={loading} //É um booleano que indica se o componente está atualmente em um estado de atualização. 
        renderItem={({item, index})=> (
          <BusinesListCard 
            key={index}
            business={item}
          />
        )}
      /> : //Se não, aparece esse text de não encontrado

      loading?<ActivityIndicator
      style={{
        marginTop : '60%'
      }}
          size={'large'}
          color={Colors.PRIMARY}
      />:

      <Text style={{
        fontSize : 20,
        fontWeight : 'bold',
        color : Colors.GRAY,
        textAlign : 'center',
        marginTop : '50%'
      }}>
        No Business Found 
      </Text>
    }
    </View>
  )
}