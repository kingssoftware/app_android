import Video, { OnBufferData } from 'react-native-video';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale'; // Locale norueguês
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScoreView from '../ScoreView';

// Dados de exemplo para a lista de serviços
const services = [{ title: 'FJORDALLÉEN 18, 0250 Oslo', date: 'Dato 20.08 – kl 10:00' }];

// Interface para as props do History
interface HistoryProps {
  selectedDate: string; // A data selecionada
  horarioInicio: string; // Horário de início do agendamento
  horarioFim: string; // Horário de fim do agendamento
}

const History: React.FC<HistoryProps> = ({ selectedDate, horarioInicio, horarioFim }) => {
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  // Formatar a data para "MMMM yyyy" em norueguês e maiúsculas
  const monthYear = format(new Date(selectedDate), 'MMMM yyyy', { locale: nb }).toUpperCase();

  // Function to generate the video URL based on the fileName
  const getVideoUrl = (fileName: string) => {
    return `https://atekoapi.kingssoftware.com.br/VideoHelp/GetVideoStreaming?fileName=${fileName}`;
  };

  return (
    <View style={styles.container}>
      {/* Seção de Vídeo (Direita) */}
      <View style={styles.videoContainer}>
        <View style={styles.videoWrapper}>
          <Video
            source={{ uri: getVideoUrl('3.mp4') }} // Dynamically generate URL
            style={styles.video}
            controls
            resizeMode="contain"
            muted={false}
            ignoreSilentSwitch="ignore"
            onError={(e: any) => console.error('Erro ao reproduzir:', e.nativeEvent)}
            onBuffer={({ isBuffering }: OnBufferData) => setIsBuffering(isBuffering)}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />
        </View>
      </View>

      {/* Seção Superior: Visão Detalhada e Vídeo */}
      <View style={styles.upperSection}>
        {/* Visão Detalhada (Esquerda) */}
        <View style={styles.detailContainer}>
          {/* Informações Detalhadas do Serviço */}
          <Text style={styles.detailTitle}>SAIMAKEVEIEN 13, 2630 Ringebu</Text>
          <Text style={styles.detailSubtitle}>Neste oppdrag.</Text>
          <Text style={styles.detailDate}>28 sep. – kl 11:00</Text>
          <Text style={styles.detailAddress}>
            Funktskade med muggsopp, salt på van som renner. Ikant av ggr.
          </Text>
          {/* Horário adicionado abaixo */}
          <Text style={styles.detailHorario}>{`klokkeslettet: ${horarioInicio} - ${horarioFim}`}</Text>

          {/* Barra de Status */}
          <View style={styles.statusBar}>
            <ScoreView />
          </View>
        </View>
      </View>

      {/* Seção Inferior: Lista de Serviços */}
      <View style={styles.lowerSection}>
        {/* Título da Lista de Tarefas com a data dinâmica */}
        <Text style={styles.monthHeader}>{monthYear}</Text>

        {/* Lista Rolável */}
        <ScrollView>
          {services.map((service, index) => (
            <View key={index} style={styles.listItem}>
              <Image
                source={{ uri: 'https://via.placeholder.com/24' }} // Substitua por ícone de casa
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDate}>{service.date}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>ENDRE DATO</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

// Estilos ajustados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp('2%'),
  },
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  bufferingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  video: {
    width: '100%',
    height: '100%',
    color: 'white',
  },
  videoWrapper: {
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
    height: hp('32%'),
    width: wp('91%'),
  },
  detailContainer: {
    flex: 1,
    marginRight: 16,
  },
  lowerSection: {
    flex: 1,
  },
  monthHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  serviceDate: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailSubtitle: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  detailDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailHorario: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16, // Espaço antes da barra de status
  },
  statusBar: {
    flexDirection: 'row',
    width: wp('100%'),
    paddingRight: wp('10%')
  },
  statusSegment: {
    flex: 1,
    marginHorizontal: 2,
  },
  yellow: {
    backgroundColor: '#FFD700',
  },
  orange: {
    backgroundColor: '#FFA500',
  },
  red: {
    backgroundColor: '#FF6347',
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  videoPlaceholder: {
    width: wp('40%'),
    height: hp('24%'),
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 24,
    color: '#666',
  },
});


export default History; 