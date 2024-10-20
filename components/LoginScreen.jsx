import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Colors } from '@/constants/Colors';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

const { width, height } = Dimensions.get('window');  // Pegando a largura e altura da tela


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


            return (
                <View style={styles.container}>
                  <View style={styles.imageContainer}>
                    <Image 
                      source={require("../assets/images/login.png")}
                      style={styles.image}
                    />
                  </View>
            
                  <View style={styles.subContainer}>
                    <Text style={styles.title}>
                      Your Ultimate
                      <Text style={styles.titleHighlight}> Community Business Directory</Text> App
                    </Text>
                    <Text style={styles.subtitle}>
                      Find your favorite business near you and own business to your community
                    </Text>
            
                    <TouchableOpacity style={styles.btn} onPress={onPress}>
                      <Text style={styles.btnText}>Let's Get Started</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
            
            const styles = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
              },
              imageContainer: {
                alignItems: 'center',
                marginTop: height * 0.05, // Responsivo com base na altura
              },
              image: {
                width: width * 0.5, // Responsivo com base na largura
                height: height * 0.5, // Responsivo com base na altura
                borderRadius: 20,
                borderWidth: 6,
                borderColor: '#000',
              },
              subContainer: {
                paddingHorizontal: width * 0.1, // Responsivo com base na largura
                paddingVertical: height * 0.02,
                marginTop: height * 0.02,
              },
              title: {
                fontSize: width * 0.09, // Responsivo com base na largura
                fontFamily: 'outfit-medium',
                textAlign: 'center',
              },
              titleHighlight: {
                color: Colors.PRIMARY,
              },
              subtitle: {
                fontSize: width * 0.04, // Responsivo com base na largura
                fontFamily: 'outfit',
                textAlign: 'center',
                marginVertical: height * 0.02,
                color: Colors.GRAY,
              },
              btn: {
                backgroundColor: Colors.PRIMARY,
                paddingVertical: height * 0.02,
                paddingHorizontal: width * 0.1,
                borderRadius: 99,
                marginTop: height * 0.03,
              },
              btnText: {
                textAlign: 'center',
                color: '#fff',
                fontFamily: 'outfit',
                fontSize: width * 0.045, // Responsivo com base na largura
              },
            });




//   return (
//     <View>  
//         <View style={{
//             display :'flex',
//             alignItems : 'center',
//             marginTop : 150
//         }}>
//             <Image 
//                 source={require("../assets/images/login.png")}
//                 style={{
//                     width : 220,
//                     height : 450,
//                     borderRadius: 20,
//                     borderWidth : 6,
//                     borderColor : '#000'
//                 }}
//             />
//         </View>

//         <View style={styles.subContainer}>
//                 <Text style={{
//                     fontSize : 35,
//                     fontFamily : 'outfit-medium',
//                     textAlign : 'center'
//                 }}>Yout Ultimate 
//                     <Text style={{
//                         color:Colors.PRIMARY
//                     }}>Community Business Directory</Text>App</Text>
//                 <Text style={{
//                     fontSize : 15,
//                     fontFamily : 'outfit',
//                     textAlign : 'center',
//                     marginVertical: 15,
//                     color: Colors.GRAY
//                 }}>Find your favorite business near you and own business to your community</Text>
        
//                 <TouchableOpacity style={styles.btn} 
//                     onPress={onPress}
//                 >
//                     <Text style={{
//                         textAlign : 'center',
//                         color: '#fff',
//                         fontFamily : 'outfit'
//                     }}>Let's Get Started</Text>
//                 </TouchableOpacity>  
//         </View>

//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     subContainer :{
//         backgroundColor:'#fff',
//         padding:50,
//         margin : -30,
//     },
//     btn:{
//         backgroundColor : Colors.PRIMARY,
//         padding : 16,
//         borderRadius : 99,
//         marginTop : 30
//     }
// });