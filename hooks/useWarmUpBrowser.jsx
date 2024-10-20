import React from "react";
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

//O useWarmUpBrowser é um hook para melhorar o desempenho ao abrir o navegador, garantindo 
//que ele esteja pronto para ser usado rapidamente e liberando recursos quando não for mais necessário.