import { Container } from 'native-base';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Definir os estilos usando StyleSheet.create
export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },


  containerLogin: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerImgLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: wp('100%'),
    paddingBottom: hp('5%'),
  },

  containerHeader: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  btnSuccess: {
    alignItems: 'center',
    backgroundColor: '#13801e',
    borderRadius: 8,
    borderColor: 'rgb(163, 163, 163)',
    borderWidth: 1,
    borderStyle: 'solid',
    margin: hp('2.5%'),
    padding: hp('1%'),
    width: wp('95%'),
  },

  btnDanger: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    borderColor: 'rgb(163, 163, 163)',
    borderWidth: 1,
    borderStyle: 'solid',
    margin: hp('2.5%'),
    padding: hp('1%'),
    width: wp('95%'),
  },



  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: hp('2.5%'),
    marginBottom: hp('2.5%'),
    color: 'black',
    fontSize: 13,
    width: wp('95%'),
  },
  btnLogin: {
    backgroundColor: '#1b437e',
    padding: 10,
    borderRadius: 45,
    marginTop: '15%',
    width: '85%',
    alignItems: 'center',
  },
  btnTelaHomeLoginSignUp: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 45,
    borderColor: '#13801e',
    borderWidth: 1,
    borderStyle: 'solid',
    height: '5%',
    margin: '2.5%',
    padding: '2%',
    width: '85%',
  },

  viewFormLogin: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    top: '-50%',
    left: '5%',
    right: 0,
    zIndex: 10,
  },
});