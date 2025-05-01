import React from 'react';

import {
  Modal,
  View,
  Text,
  ScrollView,
  ModalProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from '../../style/boody';

// Definindo as props que o componente vai aceitar
interface CustomModalProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const TextModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  content,
  ...modalProps // Permite passar outras props do Modal nativo
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      {...modalProps} // Spread para props adicionais
    >
      <View style={localStyle.modalContainer}>
        <View style={localStyle.modalContent}>
          {/* 🔹 Header */}
          <View style={localStyle.modalHeader}>
            <Text style={localStyle.title}>{title}</Text>
          </View>

          {/* 🔹 Body */}
          <View style={localStyle.modalBody}>
            <ScrollView>
              <Text style={localStyle.text}>{content}</Text>
            </ScrollView>
          </View>

          {/* 🔹 Footer */}
          <View style={localStyle.modalFooter}>
            <TouchableOpacity
              style={[
                styles.btnSuccess,
                {
                  width: wp('75%'),
                  marginLeft: wp('5%'),
                },
              ]}
              onPress={onClose}>
              <Text
                style={{
                  color: 'whitesmoke',
                  fontSize: wp('5.5%'),
                  fontFamily: 'accid',
                }}>
                Lukk
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Estilos
const localStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalContent: {
    width: wp('90%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  modalBody: {
    maxHeight: hp('50%'), // Limita a altura do conteúdo
    marginVertical: 10,
  },
  text: {
    fontSize: wp('4%'),
    lineHeight: wp('6%'),
  },
  modalFooter: {
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default TextModal;
