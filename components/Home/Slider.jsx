import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {db} from './../../configs/FirebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore'


export default function Slider() {
    const [sliderList, setSliderList] = useState([]);


    useEffect(() =>{ //useEffect é executado assim que o componente é montado, ou seja, na primeira renderização.
        GetSliderList(); // Chama a função GetSliderList assim que o componente é renderizado.
    },[]);

    const GetSliderList = async () => { 
        setSliderList([]); //Limpa a lista de sliders ao redefinir o estado sliderList como um array vazio.  Isso é feito para garantir que a lista seja atualizada e não acumule dados duplicados.
              //query(): Cria uma consulta para buscar documentos dessa coleção.
        const q=query(collection(db,'Slider')); //Acessa a coleção chamada Slider no Firestore
        const querySnapshot= await getDocs(q); //Faz a consulta ao Firestore e retorna os documentos da coleção Slider.

        querySnapshot.forEach((doc) => { //É usado para percorrer cada documento da consulta retornada.
            console.log(doc.data()); //Essa função retorna os dados do documento atual na forma de um objeto.
            setSliderList(prev=>[...prev, doc.data()]); // Atualiza o estado sliderList com os dados de cada documento.
            //prev => [...prev, doc.data()]: Isso usa o valor anterior de sliderList (prev) e cria uma nova lista contendo todos os itens anteriores, além do novo documento que está sendo adicionado.
        })
    }

  return (
    <View>
        <Text style={{
            fontFamily : 'outfit-medium',
            fontSize : 20,
            paddingLeft : 20,
            paddingTop : 20,
            marginBottom : 5
        }}>
            #Especial para você
        </Text>

        <FlatList 
            data={sliderList} //Pega as informações que serão renderizadas na tela.
            horizontal={true} //Vai deixar como horizontal
            showsHorizontalScrollIndicator={false} //Vai deixar invisível a rolagem
            style={{paddingLeft:20}}
            renderItem={({item, index}) => ( //Renderiza cada item da lista de dados na tela, ou seja, ela define como cada item individual da lista será exibido.
                <Image 
                    source={{uri:item.imageUrl}} //Esta indo pegar a imageUrl
                    style={{
                        width : 300,
                        height: 150,
                        borderRadius:15,
                        marginRight : 15
                    }}
                />
            )}
        />
    </View>
  )
}