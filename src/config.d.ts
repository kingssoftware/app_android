declare module 'react-native-dotenv' {
  export const API_URL: string;
}
declare module '@env' {
  export const API_URL: string;
  export const API_KEY: string;
  export const MAP_KEY: string;
  export const GROK_KEY: string;
  export const WEB_SOCKET: string;
  // Adicione outras variáveis de ambiente que você esteja usando
}
// src/types/svg.d.ts
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module 'react-native-vector-icons/Ionicons';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/FontAwesome';

declare module 'react-native-vector-icons';
declare module 'react-native-html-to-pdf';
declare module 'react-native-open-file';
