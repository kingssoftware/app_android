import axios from 'axios';
import AuthContextData from '../../context';
import Input from '../../component/Input';
import Icon from 'react-native-vector-icons/Ionicons';

// import {API_URL} from '@env';
import {_access} from '../../services/login_services';
import {styles} from '../../style/boody';
import {iLogin, iLoginAcess} from '../../types/iLogin';
import {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  _authuser,
  _checked,
  _unchecked,
} from '../../services/auth_login_services';
import {iAuthLogin} from '../../types/iAuthLogin';

const ax = axios.create({baseURL: 'API_URL'});

const Login = () => {
  const nav: any = useNavigation();
  const {check} = useContext(AuthContextData);

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [saveCredentials, setSaveCredentials] = useState<boolean>(false); // Estado para o checkbox

  const [bruker, setBruker] = useState<iLogin>({
    bruker: '',
    passord: '',
  });

  useEffect(() => {
    const loading = async () => {
      const auth: iAuthLogin = await _authuser();

      console.log(auth);

      if (auth) {
        setBruker(prev => ({...prev, bruker: auth.email, passord: auth.senha}));
        setSaveCredentials(true);
      }
    };
    loading();
  }, []);

  // Monitora alterações em bruker e passord para desmarcar o checkbox
  useEffect(() => {
    if (saveCredentials) {
      setSaveCredentials(false);
      _unchecked(); // Desmarca as credenciais salvas no serviço
    }
  }, [bruker.bruker, bruker.passord]);

  const SaveLogin = async () => {
    if (bruker.bruker == '') {
      Alert.alert('Alerta!', `Fyll ut e-posten, vær så snill!`, [
        {text: 'Ok', style: 'cancel'},
      ]);
      return;
    }

    if (bruker.passord == '') {
      Alert.alert('Alerta!', `Fyll ut passordet, vær så snill!`, [
        {text: 'Ok', style: 'cancel'},
      ]);
      return;
    }

    const auth_login: any = {email: bruker.bruker, senha: bruker.passord};
    await _checked(auth_login);

    setSaveCredentials(true);
  };

  const UncheckedSaveLogin = async () => {
    await _unchecked();
    setSaveCredentials(false);
  };

  const _login = async () => {
    setLoading(true);
    try {
      const response = await ax.post(
        'Account/Adgang',
        {bruker: bruker.bruker, passord: bruker.passord},
        {headers: {'Content-Type': 'application/json'}},
      );
      const access: any = response.data;
      if (access.token) {
        const obj: iLoginAcess = {
          objID: null,
          idTillatelse: access.idTillatelse,
          token: access.token,
          forOgEtternavn: access.forOgEtternavn,
          bruker: access.bruker,
          brukertype: access.brukertype,
          expire: access.expiration,
        };
        await _access(obj);
        await check();
      } else {
        Alert.alert('Alerta!', `${access.msg}\n${access.subMSG}`, [
          {text: 'Ok', style: 'cancel'},
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" animating={true} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: 'whitesmoke', marginTop: hp('-10%')},
      ]}>
      <View style={[styles.containerLogin, {backgroundColor: 'whitesmoke'}]}>
        <View style={styles.containerImgLogin}>
          <Image
            source={require('../../assets/AtekoLogo.png')}
            style={{
              width: wp('100%'),
              height: hp('18%'),
              marginLeft: hp('1%'),
            }}
          />
        </View>
        <View style={{alignItems: 'center', width: wp('90%')}}>
          <Input
            placeholder="E-Post"
            value={bruker.bruker}
            onChangeText={(txt: string) =>
              setBruker((prevState: any) => ({...prevState, bruker: txt}))
            }
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            width: wp('90%'),
            flexDirection: 'row',
          }}>
          <Input
            secureTextEntry={!showPassword}
            placeholder="Passord"
            value={bruker.passord}
            onChangeText={(txt: string) =>
              setBruker((prevState: any) => ({...prevState, passord: txt}))
            }
            style={{flex: 1}}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{padding: wp('2%'), justifyContent: 'center'}}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={wp('6%')}
              color="#13801e"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('2%'),
            marginLeft: wp('5%'),
          }}>
          <TouchableOpacity
            onPress={() =>
              !saveCredentials ? SaveLogin() : UncheckedSaveLogin()
            }
            style={{
              width: wp('6%'),
              height: wp('6%'),
              borderWidth: 2,
              borderColor: '#13801e',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: saveCredentials ? '#13801e' : 'transparent',
            }}>
            {saveCredentials && (
              <Icon name="checkmark" size={wp('4%')} color="whitesmoke" />
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: '#605e5d',
              fontSize: wp('4%'),
              marginLeft: wp('2%'),
            }}>
            Lagre e-post og passord
          </Text>
        </View>

        <View style={{flexDirection: 'column', marginTop: wp('1%')}}>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => console.log('olá')}>
                <Text style={{color: '#13801e', fontSize: wp('5%')}}>
                  {' Jeg har glemt passordet mitt? '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: wp('10%'), height: hp('2%')}} />

          <View style={{alignItems: 'center', marginBottom: hp('2%')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={localStyle.txtCreateAccount}>
                Opprett en ny konto?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => nav.navigate('Register', {screen: 'register'})}>
                <Text style={{color: '#13801e', fontSize: wp('5%')}}>
                  {' Registrer deg'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnSuccess} onPress={_login}>
          <Text style={{color: 'whitesmoke', fontSize: wp('5%')}}>
            LOGG INN
          </Text>
        </TouchableOpacity>
      </View>

      <View style={localStyle.container}>
        <View style={localStyle.lineWrapper}>
          <View style={localStyle.line} />
          <Text style={localStyle.text}>Logg inn via sosiale medier</Text>
          <View style={localStyle.line} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('2%'),
          }}>
          <TouchableOpacity onPress={() => console.log('olá')}>
            <Image source={require('../../assets/facebook.png')} />
          </TouchableOpacity>
          <View style={{width: wp('10%')}} />
          <TouchableOpacity onPress={() => console.log('olá')}>
            <Image source={require('../../assets/google.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: hp('2.5%'),
    position: 'absolute',
    width: wp('90%'),
    marginHorizontal: wp('6%'),
  },
  txtCreateAccount: {
    color: '#605e5d',
    fontSize: wp('5%'),
  },
  lineWrapper: {
    flexDirection: 'row',
    width: wp('100%'),
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    flex: 1,
    marginTop: hp('1.6%'),
    marginLeft: wp('1%'),
  },
  text: {
    textAlign: 'justify',
    fontSize: 16,
  },
});

export default Login;
