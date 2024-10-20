import { Redirect } from "expo-router";

export default function Index() {
  // Ao carregar o componente Index, o <Redirect /> automaticamente redireciona o usuário para a rota '/home'
  return <Redirect href={'/home'}/>
}
