// import * as turf from '@turf/turf';

// import api from '../../config/api';
// import DropdownMenu from '../MenuProfissional';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MapboxGL from '@rnmapbox/maps';
// import Marker from '../Marker';
// import Geolocation from '@react-native-community/geolocation';
// import ScoreView from '../ScoreView';
// import uuid from 'react-native-uuid';
// import iRouteData from '../../types/iRouteData';

// import { MAP_KEY } from '@env';
// import { useEffect, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { styles } from '../../style/boody';
// import { _user } from '../../services/login_services';
// import { _findUserCoord, _saveCoord } from '../../services/user_coord_service';
// import { SignalRService } from '../../class/signalr_services';
// import { create_router } from '../../services/map_services';
// import CalenderWeek from '../CalenderWeek';

// MapboxGL.setAccessToken(MAP_KEY);

// type Coordinate = [number, number];

// const tyler: string = 'mapbox://styles/mapbox/satellite-streets-v12'

// const ProfMap = () => {
//   const [map_error, setMapError] = useState<string>('');

//   const [cliente_route, setClienteRoute] = useState<Coordinate[]>([]);
//   const [routeData, setRouteData] = useState<iRouteData | null>(null);
//   const [profissional_point, setProfissionalPoint] = useState<any>([]);

//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showSolicitation, setShowSolicitation] = useState(false);

//   const [zoom, setZoom] = useState<number>(18);
//   const [bounds, setBounds] = useState<any>(null);

//   const [selectedDate, setSelectedDate] = useState<string | null>(null);

//   const markedDates = {
//     '2025-03-01': { marked: true, dotColor: 'green' },
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       getCurrentLocation();
//     }, 1000);
//   }, []);

//   /// Captura a coordenada do ponto de geolocalização do celular para o profissional.
//   const getCurrentLocation = async () => {
//     await Geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude }: any = position.coords;
//       await setBounds([longitude, latitude]);
//       await setProf(longitude, latitude);

//       const us = await _user();
//       const initialPoint = {
//         idBruker: us.bruker.id,
//         objID: uuid.v4(),
//         point: '',
//         point_coordinates_pro: [longitude, latitude],
//       };
//       await _saveCoord(initialPoint);
//       setProfissionalPoint([initialPoint])
//     });
//   };

//   const setProf = async (x: number, y: number) => {
//     const us = await _user();
//     const locationBruker = {
//       objID: uuid.v4(),
//       idBruker: us.bruker.id,
//       x: x,
//       y: y,
//     };

//     try {
//       /// Solicitação do profissional.
//       await api.post('/LocationBruker', locationBruker, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//     } catch (error) {
//       console.log(error)
//     }
//   };

//   // Exemplo de uso com um hook
//   useEffect(() => {
//     let isMounted = true;
//     // Instância do serviço para usar durante o ciclo de vida do componente
//     const signalRService = new SignalRService();
//       const setupSignalR = async () => {
//         const us = await _user();
//         try {
//           // Inicia a conexão com o SignalR
//           await signalRService.startConnection();
//           const resp = await signalRService.InvokeSolicitationBruker({ id: us.bruker.id });
//           await fetchRoute(resp.lat, resp.lng);

//         } catch (err) {
//           if (isMounted) {
//             console.error('❌ Erro ao configurar SignalR:', err);
//           }
//         }
//       };

//     setupSignalR();

//     // Cleanup: encerra a conexão quando o componente desmontar.
//     return () => {
//       isMounted = false;
//       signalRService.stopConnection().then(() =>
//         console.log('🔌 SignalR desconectado.')
//       );
//     };
//   }, []);

//   const fetchRoute = async (x: number, y: number) => {
//     const us = await _user();
//     const user_point = await _findUserCoord(us.bruker.id);

//     const url = create_router(user_point.point_coordinates_pro, y, x);
//     try {
//       const response = await fetch(url);
//       const data: iRouteData = await response.json();

//       setRouteData(data);
//       if (data.routes && data.routes.length > 0) {
//         const routeCoordinates = data.routes[0].geometry.coordinates;
//         setClienteRoute(routeCoordinates);

//         const lineString = turf.lineString(routeCoordinates);
//         const boundsArray = turf.bbox(lineString);

//         const centerCoordinate = [
//           (boundsArray[0] + boundsArray[2]) / 2,
//           (boundsArray[1] + boundsArray[3]) / 2,
//         ];

//         setBounds(centerCoordinate);

//         const latDiff = boundsArray[3] - boundsArray[1];
//         const lngDiff = boundsArray[2] - boundsArray[0];
//         const screenWidth = wp('50%');
//         const screenHeight = hp('50%');
//         const zoomLat = Math.log2(screenHeight / latDiff);
//         const zoomLng = Math.log2(screenWidth / lngDiff);
//         const zoomLevel = Math.min(zoomLat, zoomLng);

//         setZoom(zoomLevel);

//         const cliente_point: any[] = [...profissional_point];

//         const initialPoint = {
//           idBruker: uuid.v4(),
//           objID: uuid.v4(),
//           point: '',
//           point_coordinates_pro: [y, x],
//         };

//         cliente_point.push(initialPoint);
//         setProfissionalPoint(cliente_point);
//         setShowSolicitation(!showSolicitation)
//       }
//     } catch (error) {
//       console.log(error);
//     }
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
//             {profissional_point.map((point: any, index: number) => {
//                 return <Marker key={point.objID} coordinate={point.point_coordinates_pro} index={index} alter_user={true} />
//             })}
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

//       <View style={{ position: 'absolute', zIndex: 100, right: 0, top: hp('2%') }}>
//         <DropdownMenu />
//       </View>

//       {/* Footer com opções e calendário */}
//       {showSolicitation && !showCalendar && (
//         <View style={localStyle.footer}>

//           <View style={{ display: 'flex', flexDirection: 'column' }}>
//             <Text style={localStyle.footerTitle}>Forespørsel fra: Michel Oliveira</Text>
//             <TouchableOpacity style={localStyle.option} >
//               <View style={localStyle.optionTextContainer}>
//                 <Text style={localStyle.optionTitle}>Vis mer kundeinfo.</Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View style={{ marginLeft: wp('0%') }}>
//             <ScoreView />
//           </View>
//           <View style={localStyle.footerInfo}>
//             <View style={localStyle.infoItem}>
//               <Icon name="directions" size={20} color="#000" />
//               <Text style={localStyle.infoText}>
//                 {routeData && routeData.routes.length > 0
//                   ? `${(routeData.routes[0].distance / 1000).toFixed(2)} km`
//                   : 'Calculando...'}
//               </Text>
//             </View>
//           </View>
//           <View style={{ display: 'flex', flexDirection: 'row', left: wp('0%'), margin: wp('-5%'), marginLeft: wp('-9%') }}>
//             <TouchableOpacity style={[styles.btnDanger, { width: wp('30%'), padding: hp('2%')}]} onPress={async () => {
//               const user = await _user();
//               const filter = profissional_point.filter((obj: any) => obj.idBruker === user.bruker.id);
//               setProfissionalPoint(filter);

//               setTimeout(() => {
//                 setClienteRoute([])
//                 setShowSolicitation(false)
//                 getCurrentLocation();
//                 setZoom(18);
//               },500)
//             }}>
//               <Text style={localStyle.confirmButtonText}>{'lukk'}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[styles.btnSuccess, {width: wp('60%'),padding: hp('2%')}]} onPress={() => setShowCalendar(true)}>
//               <Text style={localStyle.confirmButtonText}>Planlegg tjeneste</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {showCalendar && (
//         <View style={localStyle.calendarFooterContainer}>
//           <View style={localStyle.sideButtonsContainer}>
//             <TouchableOpacity style={localStyle.sideButton}>
//               {/* <Image source={require('assets/icons/chat-bot.png')} style={styles.sideButtonIcon} /> */}
//             </TouchableOpacity>
//             <TouchableOpacity style={localStyle.sideButton}>
//               {/* <Image source={require('assets/icons/contato.png')} style={styles.sideButtonIcon} /> */}
//             </TouchableOpacity>
//             <TouchableOpacity style={localStyle.sideButton}>
//               {/* <Image source={require('assets/icons/cam.png')} style={styles.sideButtonIcon} /> */}
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={localStyle.minimizeButton}
//               onPress={() => {
//                 setShowCalendar(false);
//                 setShowSolicitation(true)
//                 setSelectedDate(null);
//               }}>
//               <Text style={localStyle.minimizeButtonText}>X</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={localStyle.calendarWrapper}>
//             <View style={localStyle.calendarContainer}>
//               <CalenderWeek
//                 onDayPress={(day: any) => setSelectedDate(day.dateString)}
//                 markedDates={markedDates}
//                 selectedDate={selectedDate}
//               />
//               <TouchableOpacity
//                 style={[localStyle.calendarFooter, !selectedDate && { backgroundColor: '#A9A9A9' }]}>
//                 <Text style={localStyle.calendarFooterText}>Bekreft dato</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       )}
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

//   cancelButton: {
//     backgroundColor: 'red',
//     padding: 15,
//     borderRadius: 5,
//     marginLeft: wp('-1.5%'),
//     alignItems: 'center',
//     width: wp('45%'),
//   },
//   calendarContainer: {
//     width: wp('100%'),
//     height: hp('25%'),
//   },
//   calendarFooterContainer: {
//     zIndex: 100,
//     position: 'absolute',
//     bottom: hp('2%'),
//     width: wp('100%'),
//   },
//   calendarWrapper: {
//     marginLeft: wp('-1%'),
//     marginBottom: hp('-2%'),
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     width: wp('100%'),
//     backgroundColor: '#fff',
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   confirmButton: {
//     backgroundColor: '#13801e',
//     padding: 15,
//     borderRadius: 5,
//     marginLeft: wp('2%'),
//     alignItems: 'center',
//   },
//   calendarFooter: {
//     backgroundColor: '#13801e',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: wp('100%'),
//     borderRadius: hp('1%'),
//     marginTop: hp('-5%'),
//   },
//   calendarFooterText: {
//     color: '#fff',
//     fontSize: wp('6%'),
//   },
//   footer: {
//     position: 'absolute',
//     bottom: hp('0%'),
//     width: wp('100%'),
//     backgroundColor: '#fff',
//     padding: wp('5%'),
//   },
//   footerTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: hp('1%'),
//   },
//   footerInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: 5,
//     borderRadius: 5,
//     width: '100%',
//   },
//   optionTextContainer: {
//     flex: 1,
//   },
//   optionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   infoText: {
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   minimizeButton: {
//     position: 'absolute',
//     width: wp('11%'),
//     height: wp('11%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     top: hp('1%'),
//     right: wp('0%'),
//     backgroundColor: '#FF3B30',
//     padding: wp('3%'),
//     borderRadius: 5,
//   },
//   minimizeButtonText: {
//     color: '#fff',
//     fontSize: wp('3%'),
//     textAlign: 'center',
//   },
//   sideButtonsContainer: {
//     flexDirection: 'row',
//     width: wp('100%'),
//     marginLeft: wp('-1.5%'),
//   },
//   sideButton: {
//     width: wp('12%'),
//     height: wp('12%'),
//     margin: wp('0.5%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#007AFF',
//     borderRadius: 5,
//   },
//   sideButtonIcon: {
//     width: wp('5%'),
//     height: hp('2%'),
//   },

// });

const ProfMap = () => {
  return <></>;
};

export default ProfMap;
