import api from '../../config/api';

import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styles } from '../../style/boody';

const Spaces = () => {
  return <View style={{ height: hp('1%') }} />;
};

const DropdownMenu = () => {
  const [isVisible, setIsVisible] = useState(false); // Controla a visibilidade do menu

  const [modalVisibleHistory, setModalVisibleHistory] = useState<boolean>(false);
  const [modalVisibleList, setModalVisibleList] = useState<boolean>(false);
  const [modalVisibleTerms, setModalVisibleTerms] = useState<boolean>(false);

  const [videoList, setLstVideo] = useState<any[]>();

  useEffect(() => {
    loading_Lst_video();
  }, []);

  const loading_Lst_video = async () => {
    const lst = await api.get('/VideoHelp/ListVideos');
    const sortedLst = lst.data.videos.sort();
    const lst_carregamento: any = [];
    for (let index = 0; index < sortedLst.length; index++) {
      const element = sortedLst[index];
      lst_carregamento.push({
        id: `${index + 1}`,
        title: `Vídeo Educacional ${index + 1}`,
        fileName: element,
      });
    }
    setLstVideo(lst_carregamento);
  };

  const toggleDropdown = () => {
    setIsVisible(!isVisible); // Alterna entre mostrar e ocultar
  };

  return (
    <View style={styles .container}>

      {/* Botão que abre/fecha o menu */}
      <TouchableOpacity style={localStyle.button} onPress={toggleDropdown}>
        <Text style={localStyle.txt_bt}>{!isVisible ? 'Hovedmeny' : 'Lukk'}</Text>
      </TouchableOpacity>
      <Spaces />

      {/* Menu suspenso que aparece/desaparece */}
      {isVisible && (
        <View>
          <View>
            <TouchableOpacity
              style={localStyle.btn}
              onPress={() => {
                setModalVisibleTerms(true);
              }}>
              <Text style={localStyle.txt_bt}>Avtale</Text>
            </TouchableOpacity>
          </View>

          <Spaces />

          <View>
            <TouchableOpacity
              style={localStyle.btn}
              onPress={() => {
                setModalVisibleList(true);
              }}>
              <Text style={localStyle.txt_bt}>Ateko akademi</Text>
            </TouchableOpacity>
          </View>

          <Spaces />

          <View>
            <TouchableOpacity style={localStyle.btn} onPress={() => {}}>
              <Text style={localStyle.txt_bt}>Oppdrag</Text>
            </TouchableOpacity>
          </View>

          <Spaces />

          <View>
            <TouchableOpacity style={localStyle.btn} onPress={() => {}}>
              <Text style={localStyle.txt_bt}>Rapport</Text>
            </TouchableOpacity>
          </View>

          <Spaces />

          <View>
            <TouchableOpacity style={localStyle.btn} onPress={() => {}}>
              <Text style={localStyle.txt_bt}>Produktbestilling</Text>
            </TouchableOpacity>
          </View>

          <Spaces />

          <View>
            <TouchableOpacity style={localStyle.btn} onPress={() => setModalVisibleHistory(true)}>
              <Text style={localStyle.txt_bt}>Fakturenring</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  btn: {
    padding: hp('1%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1.5%'),
    backgroundColor: '#0c6325',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#0c6325',
    borderRadius: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 50, // Ajuste conforme necessário
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 150,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  containe_st: {
    paddingTop: hp('0.5%'),
    padding: wp('0.5%'),
  },
  txt_bt: {
    color: 'whitesmoke',
    fontSize: wp('4%'),
  },
});

export default DropdownMenu;
