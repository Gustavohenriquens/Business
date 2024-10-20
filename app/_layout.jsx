import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import LoginScreen from '../components/LoginScreen';
import * as SecureStore from 'expo-secure-store'


const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} foi usado 🔐 \n`)
      } else {
        console.log('Nenhum valor armazenado na chave: ' + key)
      } 
      return item
    } catch (error) {
      console.error('Erro ao obter item do SecureStore: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },

  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}



export default function RootLayout() {  
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf')
  })

  return (
    // O ClerkProvider gerencia o estado de autenticação do app. Ele determina se o usuário está autenticado (SignedIn) ou não (SignedOut)
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>

      {/* Assim que a autenticação é concluída (por exemplo, quando o createdSessionId é gerado), o Clerk detecta que o usuário está "logado" e exibe o conteúdo dentro do <SignedIn>, que, no seu caso, é a navegação para as telas (<Stack>). */}
      <SignedIn> 
        <Stack screenOptions={{
          headerShown:false}}>
          <Stack.Screen name="(tabs)"/>
        </Stack>
      </SignedIn>


      {/* Esse componente é exibido quando o usuário não está autenticado. Ele contém o LoginScreen, ou seja, a tela de login é exibida apenas quando o usuário ainda não fez login. */}
      <SignedOut>
        <LoginScreen/>
      </SignedOut>

    </ClerkProvider>
  );
}
