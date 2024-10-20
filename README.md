# Home/Header 

## Autenticação com usuário :    

import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
        useWarmUpBrowser();

        const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"}); //Iniciar o fluxo de autenticação OAuth usando o Google. 

        const onPress = React.useCallback(async() => {
            try{
                const { createdSessionId, signId, signUp, setActive} =
                    await startOAuthFlow(); //Essa função deve retornar um objeto com as propriedades createdSessionId, signId, signUp e setActive.

                if (createdSessionId) { //Verifica se createdSessionId foi criado com sucesso. 
                    setActive({ session: createdSessionId}); //Se sim, a função setActive é chamada com o createdSessionId para ativar a sessão.
                } else {

                  }
                } catch (err) {
                    console.error("OAuth error", err); // Se createdSessionId não estiver presente, um erro é registrado no console
                }
            }, []);


                <TouchableOpacity style={styles.btn} 
                    onPress={onPress}
                >
                    <Text style={{
                        textAlign : 'center',
                        color: '#fff',
                        fontFamily : 'outfit'
                    }}>Let's Get Started</Text>
                </TouchableOpacity>  

### Buscar informações da autenticação

const {user} = useUser(); //acessa informações do usuário autenticado.

            <Image  source={{uri:user?.imageUrl}} //Acessa a imagem do usaurio logado, o "Conta do Google"
                style={{
                    width: 45,
                    height : 45,
                    borderRadius : 99
                }}
            />

### SingUp - Autenticação 

const {signOut} = useAuth(); //Quando chamada, ela realiza a ação de logout do usuário, geralmente limpando o estado de autenticação e redirecionando o usuário para a tela de login ou uma página pública.

    const onMenuClick = (item) => {
        if(item.path=='logout'){  //Verifica se o caminho (path) do item selecionado é 'logout'.
            signOut(); //Desloga o usuário (função extraída anteriormente do hook useAuth).
            return; 
        }
        if(item.path=='share'){
            Share.share( //Se for, a função Share.share() é chamada para compartilhar uma mensagem.
                { 
                    message: 'Download the Business Directory App by Tubeguruji, Download URL:'
                }
            ) 
            return;
        }
        router.push(item.path)
    }

      <TouchableOpacity 
         onPress={() => onMenuClick(item)}







# Conexão com o FIREBASE - Códigos

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





# Router - Nagevação de página

import { useRouter } from 'expo-router'

  const router = useRouter(); //Permite acessar e manipular o roteamento de páginas em um aplicativo

      const onCategoryPressHandler = (item) => {
      if(!explore){
        router.push('/businesslist/' + item.name)
      }else {
        onCategorySelect(item.name);
      }
    }





# Imagem - Camera 

import * as ImagePicker from 'expo-image-picker';  

    const onImagePick = async () => { // Como ela usa async, permite o uso de await para lidar com operações que demoram, como abrir a galeria de imagens.
        let result = await ImagePicker.launchImageLibraryAsync({ // Usa o método launchImageLibraryAsync do pacote ImagePicker para abrir a galeria do dispositivo e permitir a seleção de uma imagem.
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Especifica que apenas imagens podem ser selecionadas (sem vídeos, por exemplo).
            allowsEditing: true, //Permite que o usuário edite a image
            
            quality: 1, //Define a qualidade da imagem selecionada, onde 1 é a qualidade máxima.    
          });
          setImagem(result?.assets[0].uri); // O código armazena o URI (o caminho da imagem selecionada no dispositivo) na variável de estado imagem
          console.log(result); 
    }


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


# useEffect

import React, { useEffect, useState } from 'react'
    useEffect(() => { // Executa o código dentro dele após o componente ser montado (quando a tela é exibida pela primeira vez). 
        navigation.setOptions({  // É usada para alterar dinamicamente as configurações do cabeçalho da tela, como o título, visibilidade, ícones, et
            headerTitle :'Add New Business', // Define o título do cabeçalho como "Add New Business".
            headerShown : true, // Garante que o cabeçalho seja exibido (caso esteja oculto por padrão)
        })
        GetCategoryList();
    },[])




# Fazer upload da imagem e Salvar

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

### Salvar no banco de dados

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


                // A função setName é responsável por atualizar o estado name com o valor v (o texto que o usuário digito
                // É o valor do texto digitado pelo usuário no TextInput. 
                onChangeText={(v) => setName(v)} 





   
