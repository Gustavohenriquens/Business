import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import {db} from '../../configs/FirebaseConfig'
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function MyBusiness() {

    const {user} = useUser();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    const  navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown:true,
            headerTitle : 'My Business',
            headerStyle: {
                backgroundColor : Colors.PRIMARY
            }
        })
        user&&GetUserBusiness();
    },[user])


        
        // usado para obter lista de empresas por e-mail do usuário
    const GetUserBusiness = async () => {
        setLoading(true);
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where('userEmail', '==', user?.primaryEmailAddress.emailAddress));
        const querySnapShpt =   await getDocs(q);
        querySnapShpt.forEach((doc) => {
            console.log(doc.data())
            setBusinessList(prev=>[...prev, {id:doc.id, ...doc.data()}])
        }) 
        setLoading(false);
    }

  return (
    <View style={{
        padding : 25    
    }}>
      <Text style={{
        fontFamily : 'outfit-bold',
        fontSize : 30
      }}>My Business</Text> 

      <FlatList 
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({item, index})=> (
            <BusinessListCard
                business={item}
                key={index}
            />
        )}
      />
    </View>
  )
}