import api from '../../config/api';
import AuthContextData from '../../context';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {_user, _userLoggout} from '../../services/login_services';
import {iBruker} from '../../types/iBruker';

// Forçar a tipagem do IconAntDesign como FC

const MenuDrawerContent = () => {
  const nav: any = useNavigation();
  const timestamp = moment.now();
  const {check} = useContext(AuthContextData);

  const [showDate, setShowDate] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [infoVideoLst, setInfoVideoLst] = useState<any[]>();

  const [kalender, setKalender] = useState<any>(new Date(timestamp));

  const [isModalOmOss, setIsModalOmOss] = useState<boolean>(false);
  const [isModalAvtal, setIsModalAvtal] = useState<boolean>(false);
  const [isModalVideo, setIsModalVideo] = useState<boolean>(false);

  const [bruker, setBruker] = useState<iBruker>({
    forOgEtternavn: '',
    telefonnummer: '',
    prosjektadresse: '',
    postnummer: '',
    epost: '',
    bilde: '',
    brukertype: '',
    rePassword: '',
    passwoord: '',
  });

  useEffect(() => {
    loading_Lst_video();
  }, []);

  useEffect(() => {
    const loading = async () => {
      const us = await _user();
      const oBruker = {...us.bruker};
      if (oBruker.bilde) {
        setBruker(prev => ({
          ...prev,
          forOgEtternavn: oBruker.forOgEtternavn,
          telefonnummer: oBruker.telefonnummer,
          bilde: oBruker.bilde.toString(),
          epost: oBruker.email,
        }));
      } else {
        setBruker(prev => ({
          ...prev,
          forOgEtternavn: oBruker.forOgEtternavn,
          telefonnummer: oBruker.telefonnummer,
          epost: oBruker.email,
        }));
      }
    };
    loading();
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
    setInfoVideoLst(lst_carregamento);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View>
        <View style={{margin: hp('4.5%')}}></View>

        <TouchableOpacity
          style={styles.conf_btn}
          onPress={() => nav.navigate('home_cliente')}>
          <View style={styles.icon_txt_btn}>
            <Text style={styles.conf_txt_btn}>hovedskjerm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conf_btn: {
    padding: wp('3%'),
    marginVertical: wp('0.5%'),
    borderRadius: wp('2%'),
    backgroundColor: 'whitesmoke',
  },
  conf_txt_btn: {
    fontSize: wp('5%'),
  },
  conf_btn_perfil: {
    width: wp('82.5%'),
    height: wp('20%'),
    padding: wp('0.8%'),
    margin: hp('0.4%'),
    borderRadius: hp('0.4%'),
    borderWidth: 1,
    borderColor: 'rgba(169, 169, 169, 0.6)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    justifyContent: 'center',
  },
  icon_txt_btn: {
    flexDirection: 'row',
    width: wp('75%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MenuDrawerContent;
