import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';    
import {query, collection, getDocs, doc, setDoc} from 'firebase/firestore';
import {db, storage} from '../../configs/FirebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';


export default function AddBusiness() {
    const navigation = useNavigation(); //Isso permite controlar a navegação e as opções de cabeçalho (como o título) da tela atual.
    const [imagem, setImagem] = useState(null);
    const [categoryList, setCategoryList] = useState([]); 
    const {user} = useUser();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
    const [webSite, setWebSite] = useState();
    const [about, setAbout] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => { // Executa o código dentro dele após o componente ser montado (quando a tela é exibida pela primeira vez). 
        navigation.setOptions({  // É usada para alterar dinamicamente as configurações do cabeçalho da tela, como o título, visibilidade, ícones, et
            headerTitle :'Add New Business', // Define o título do cabeçalho como "Add New Business".
            headerShown : true, // Garante que o cabeçalho seja exibido (caso esteja oculto por padrão)
        })
        GetCategoryList();
    },[])

    const onImagePick = async () => { // Como ela usa async, permite o uso de await para lidar com operações que demoram, como abrir a galeria de imagens.
        let result = await ImagePicker.launchImageLibraryAsync({ // Usa o método launchImageLibraryAsync do pacote ImagePicker para abrir a galeria do dispositivo e permitir a seleção de uma imagem.
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Especifica que apenas imagens podem ser selecionadas (sem vídeos, por exemplo).
            allowsEditing: true, //Permite que o usuário edite a image
            
            quality: 1, //Define a qualidade da imagem selecionada, onde 1 é a qualidade máxima.    
          });
          setImagem(result?.assets[0].uri); // O código armazena o URI (o caminho da imagem selecionada no dispositivo) na variável de estado imagem
          console.log(result); 
    }

    const GetCategoryList = async () => {
        setCategoryList([]); //Antes de buscar os dados, a lista de categorias (categoryList) é redefinida para um array vazio.
        const q = query(collection(db, 'Category')); //
        const snapShot = await getDocs(q);

        snapShot.forEach((doc) => { //doc: Cada documento individual dentro da coleção 'Category'
            console.log(doc.data()); 
            setCategoryList(prev=>[...prev, { //Essa linha atualiza a lista de categorias (categoryList) no estado. O uso de prev => [...prev, {...}] garante que você está mantendo os itens anteriores da lista e adicionando o novo item no final.
                label:(doc.data()).name, //O rótulo da categoria é definido como o valor da propriedade name do documento.
                value:(doc.data()).name //O valor também é definido como o valor da propriedade name.
            }])
        })
    }

    const onAddNewBusiness = async () => { //Essa função é responsável por realizar o upload da imagem e salvar os detalhes do novo negócio.
        setLoading(true); //Isso ativa o estado de carregamento
        const fileName = Date.now().toString()+".jpg"; //Gera um nome único para o arquivo de imagem usando o timestamp atual concatenado com a extensão .jpg.
        const resp = await fetch(imagem); //Imagem é obtida através de uma URL (imagem), que é transformada em um blob para ser carregada no armazenamento de arquivos.
        const blob = await resp.blob();

        const imagemRef = ref(storage, 'business-app/'+fileName); //Cria uma referência (imagemRef) no armazenamento (storage) onde a imagem será sal
        
        uploadBytes(imagemRef, blob).then((snapShot) => { //ealiza o upload do blob (imagem) para o local definido em imagemRe
            console.log("File Uploaded...")
        }).then(resp =>{
            getDownloadURL(imagemRef).then(async(downloadUrl)=>{ //Após o upload, a URL da imagem é recuperada (usada para exibir a imagem no futuro) e passada para a função saveBusinessDetail.
                console.log(downloadUrl)
                saveBusinessDetail(downloadUrl)
            })
        })
        setLoading(false); //O carregamento terminar
    }

    const saveBusinessDetail = async (imageUrl) => {  //Essa função salva os detalhes do negócio no banco de dados.
        await setDoc(doc(db,'BusinessList', Date.now().toString()),{ //Os detalhes nome, endereço, contato etc, são salvos no Firestore (um banco de dados NoSQL do Firebase) dentro da BusinessList. . A chave única para o documento é gerada com Date.now().toString().
            name:name,
            address:address,
            contact : contact,
            webSite : webSite,
            about : about,
            category : category,
            userName:user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            userImage : user?.imageUrl,
            imageUrl : imageUrl
        })
        setLoading(false); //O estado de carregamento é desativado e uma mensagem de confirmação é exibida usando ToastAndroid.
        ToastAndroid.show('New business addedd...', ToastAndroid.LONG)  
    }

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily : 'outfit-bold',
        fontSize : 25 
      }}>Add New Business</Text>
      <Text style={{
        fontFamily : 'outfit',
        color : Colors.GRAY
      }}>Fill all details in order to add new business</Text>


        <TouchableOpacity style={{
            marginTop:20
        }}
        onPress={() => onImagePick()}
        >
          {!imagem?  
            <Image 
                source={require('./../../assets/images/placeholder.png')}
                style={{
                    width : 100,
                    height : 100
                }}
            /> 
            :
            <Image 
                source={{uri:imagem}}
                style={{
                    width : 100,
                    height : 100,
                    borderRadius : 15
                }}
            />}

        </TouchableOpacity>

        <View>
            <TextInput 
                placeholder='Name'
                // A função setName é responsável por atualizar o estado name com o valor v (o texto que o usuário digito
                // É o valor do texto digitado pelo usuário no TextInput. 
                onChangeText={(v) => setName(v)} 
                style={{
                    padding : 10,
                    borderWidth : 1,
                    borderRadius : 5,
                    fontSize : 17,
                    backgroundColor : '#fff',
                    marginTop : 10,
                    borderColor : Colors.PRIMARY,
                    fontFamily : 'outfit'
                }}
            />

            <TextInput 
                placeholder='Address'
                onChangeText={(v) => setAddress(v)}
                style={{
                    padding : 10,
                    borderWidth : 1,
                    borderRadius : 5,
                    fontSize : 17,
                    backgroundColor : '#fff',
                    marginTop : 10,
                    borderColor : Colors.PRIMARY,
                    fontFamily : 'outfit'
                }}
            />

            <TextInput 
                placeholder='Contact'
                onChangeText={(v) => setContact(v)}
                style={{
                    padding : 10,
                    borderWidth : 1,
                    borderRadius : 5,
                    fontSize : 17,
                    backgroundColor : '#fff',
                    marginTop : 10,
                    borderColor : Colors.PRIMARY,
                    fontFamily : 'outfit'
                }}
            />

            <TextInput 
                placeholder='WebSite'
                onChangeText={(v) => setWebSite(v)}
                style={{
                    padding : 10,
                    borderWidth : 1,
                    borderRadius : 5,
                    fontSize : 17,
                    backgroundColor : '#fff',
                    marginTop : 10,
                    borderColor : Colors.PRIMARY,
                    fontFamily : 'outfit'
                }}
            />

            <TextInput 
                placeholder='About'
                onChangeText={(v) => setAbout(v)}
                multiline
                numberOfLines={5}
                style={{
                    padding : 10,
                    borderWidth : 1,
                    borderRadius : 5,
                    fontSize : 17,
                    backgroundColor : '#fff',
                    marginTop : 10,
                    borderColor : Colors.PRIMARY,
                    fontFamily : 'outfit',
                    height : 100 
                }}
            />

            <View style={{
                borderWidth : 1,
                borderRadius : 5,
                backgroundColor : '#fff',
                marginTop : 10,
                borderColor : Colors.PRIMARY,
            }}>
                <RNPickerSelect
                    onValueChange={(value) => setCategory(value)}
                    items={categoryList}
                />
            </View>
        </View>

            <TouchableOpacity 
            disabled={loading}
            style={{
                padding : 15,
                backgroundColor : Colors.PRIMARY,
                borderRadius : 5,
                marginTop : 20,
            }}
            onPress={() => onAddNewBusiness()}
            >
                {loading?
                <ActivityIndicator size={'large'} color={'#fff'}/>:
                <Text style={{
                    textAlign  : 'center',
                    fontFamily : 'outfit-medium',
                    color : "#fff"
                }}>Add New Businesss</Text>}
            </TouchableOpacity>
    </View>
  )
}