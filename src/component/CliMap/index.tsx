// import api from '../../config/api';
// import MapboxGL from '@rnmapbox/maps';
// import Marker from '../Marker';
// import Geolocation from '@react-native-community/geolocation';
// import uuid from 'react-native-uuid';

// import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

// import { MAP_KEY } from '@env';
// import { useEffect, useState } from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { styles } from '../../style/boody';
// import { _user } from '../../services/login_services';
// import ScoreView from '../ScoreView';
// import QuestionsView from '../QuestionView';
// import { width } from 'styled-system';
// import FlaskModal from '../FlaskModal';
// import Chatbot from '../ChatBot';
// import { useNavigation } from '@react-navigation/native';
// import { _saveCoord } from '../../services/user_coord_service';

// MapboxGL.setAccessToken(MAP_KEY);

// type Coordinate = [number, number];

// const tyler: string = 'mapbox://styles/mapbox/satellite-streets-v12'

// const CliMap = () => {
//   const nav: any = useNavigation();

//   const [map_error, setMapError] = useState<string>('');

//   const [cliente_route, setClienteRoute] = useState<Coordinate[]>([]);
//   const [profissional_point, setProfissionalPoint] = useState<any>([]);

//   const [zoom, setZoom] = useState<number>(18);
//   const [bounds, setBounds] = useState<any>(null);

//   const [isChatModal, setIsChatModal] = useState<boolean>(false);

//   useEffect(() => {
//     setTimeout(() => {
//       getCurrentLocation();
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     const update_point = async () => {
//       if (bounds) {
//         const us = await _user();
//         const initialPoint = {
//           idBruker: us.bruker.id,
//           objID: uuid.v4(),
//           point: '',
//           point_coordinates_pro: [bounds[0], bounds[1]],
//         };

//         await _saveCoord(initialPoint);
//         setProfissionalPoint([initialPoint]);
//       }
//     };
//     update_point();
//   }, [bounds]);

//   /// Captura a coordenada do ponto de geolocalização do celular para o profissional.
//   const getCurrentLocation = async () => {
//     await Geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude }: any = position.coords;
//       await setBounds([longitude, latitude]);
//       await UpClienteCoord(longitude, latitude);
//     });
//   };

//   const UpClienteCoord = async (x: number, y: number) => {

//     const us = await _user();
//     const locationBruker = {
//       objID: uuid.v4(),
//       idBruker: us.bruker.id,
//       x: x,
//       y: y,
//     };

//     /// Solicitação do profissional.
//     //const resp: any = await api.post('/LocationBruker', locationBruker, {
//       //headers: { 'Content-Type': 'application/json' },
//     //});
//   };

//   return (
//     <View style={styles.container}>
//       {map_error ? (
//         <Text style={localStyle.map_error}>{map_error}</Text>
//       ) : (
//         <MapboxGL.MapView
//           style={localStyle.map}
//           zoomEnabled={true}
//           styleURL={tyler}
//           rotateEnabled={false}
//           onDidFinishLoadingMap={() => getCurrentLocation()}>
//           <>
//             <MapboxGL.Camera centerCoordinate={bounds} zoomLevel={zoom} animationMode="flyTo" />
//             {profissional_point.map((point: any, index: number) => (
//               <Marker
//                 key={point.objID}
//                 coordinate={point.point_coordinates_pro}
//                 index={index}
//                 alter_user={false}
//               />
//             ))}
//             {cliente_route.length > 0 && (
//               <MapboxGL.ShapeSource
//                 id="routeSource"
//                 shape={{ type: 'LineString', coordinates: cliente_route } as GeoJSON.LineString}>
//                 <MapboxGL.LineLayer id="routeLayer" style={{ lineColor: 'red', lineWidth: 4 }} />
//               </MapboxGL.ShapeSource>
//             )}
//           </>
//         </MapboxGL.MapView>
//       )}

//       <View
//         style={{
//           position: 'absolute',
//           width: wp('100%'),
//           height: hp('25%'),
//           top: 0,
//           right: 0,
//           backgroundColor: 'whitesmoke',
//         }}>
//         <View style={{ position: 'absolute', top: hp('-1.7%'), width: wp('100%') }}>
//           <ScoreView/>
//         </View>
//         <View style={{ position: 'absolute', top: hp('2%'), width: wp('100%') }}>
//           <QuestionsView />
//         </View>
//       </View>

//       {/* Botões na parte inferior (Camera, Hjelp, PDF, ChatBot) */}
//       <View
//         style={{
//           zIndex: 100,
//           position: 'absolute',
//           bottom: hp('-1%'),
//           width: wp('100%'),
//         }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', padding: wp('0%'), marginLeft: wp('-4%')}}>
//           <TouchableOpacity
//             style={[styles.btnSuccess, { width: wp('60%')}]}
//             onPress={() => nav.navigate('camera', { screen: 'bild' })}>

//             <Icon name="camera" size={wp('9%')} color="whitesmoke"  />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.btnSuccess, { width: wp('30%')}]}
//             onPress={() => setIsChatModal(true)}>

//             <Icon name="comment" size={wp('9%')} color="whitesmoke"  />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <FlaskModal
//         visible={isChatModal}
//         onClose={() => setIsChatModal(false)}
//         title=""
//         content={
//           <View style={{ zIndex: 10, height: hp('70%'), width: wp('92%') }}>
//             <View style={{ zIndex: 10, height: hp('70%') }}>
//               <Chatbot />
//             </View>
//           </View>
//         }
//       />

//     </View>
//   )
// }
// const localStyle = StyleSheet.create({
//   map: {
//     width: wp('100%'),
//     height: hp('100%'),
//   },
//   map_error: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//   },

// });

const CliMap = () => {
  return <></>;
};

export default CliMap;
