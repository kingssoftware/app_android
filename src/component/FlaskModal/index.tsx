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

interface CustomModalProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: any;
}

const FlaskModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  content,
  ...modalProps
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      {...modalProps}>
      <View style={localStyles.modalContainer}>
        <View style={localStyles.modalContent}>
          {/* 🔹 Header com botão de fechar */}
          <View style={localStyles.modalHeader}>
            <Text style={localStyles.title}>{title}</Text>
            <TouchableOpacity style={localStyles.closeButton} onPress={onClose}>
              <Text style={localStyles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 Body */}
          <View style={localStyles.modalBody}>
            <ScrollView>{content}</ScrollView>
          </View>

          {/* 🔹 Footer removido */}
        </View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('95%'),
    backgroundColor: 'white',
    borderRadius: hp('0.5%'),
    padding: wp('0.5%'),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeButtonText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: 'black',
  },
  modalBody: {
    maxHeight: hp('75%'),
    marginVertical: 10,
  },
  modalFooter: {
    alignItems: 'center',
    paddingTop: hp('2%'),
  },
});

export default FlaskModal;
