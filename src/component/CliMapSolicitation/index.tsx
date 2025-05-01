// import MapboxGL from '@rnmapbox/maps';
// import Marker from '../Marker';
// import Geolocation from '@react-native-community/geolocation';
// import uuid from 'react-native-uuid';

// import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

// import { MAP_KEY } from '@env';
// import { useEffect, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { styles } from '../../style/boody';
// import { _user } from '../../services/login_services';
// import { useNavigation } from '@react-navigation/native';
// import { _saveCoord } from '../../services/user_coord_service';

// MapboxGL.setAccessToken(MAP_KEY);

// type Coordinate = [number, number];

// const tyler: string = 'mapbox://styles/mapbox/satellite-streets-v12'

// const CliMapSolicitation = () => {
//   const nav: any = useNavigation();

//   const [map_error, setMapError] = useState<string>('');

//   const [profissional_point, setProfissionalPoint] = useState<any>([]);

//   const [zoom, setZoom] = useState<number>(18);
//   const [bounds, setBounds] = useState<any>(null);

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
//     });
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
//           </>
//         </MapboxGL.MapView>
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

// });

const CliMapSolicitation = () => {
  return <></>;
};

export default CliMapSolicitation;
