import { TextInput, StyleSheet } from 'react-native';
import { styles as globalStyles } from '../../style/boody';

const Input = ({ style, ...props }: any) => {
  // Combina o estilo padrão com o estilo externo (se existir)
  const inputStyle = style ? [globalStyles.input, style] : globalStyles.input;

  return <TextInput style={inputStyle} {...props} placeholderTextColor="#ababab" />;
};

export default Input;