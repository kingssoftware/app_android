import * as React from 'react';
import {Camera, useCameraDevice, VideoFile} from 'react-native-vision-camera';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';

import RNFS from 'react-native-fs';

interface Ponto {
  x: number;
  y: number;
  timestamp: number;
}

export function CameraPage(): React.ReactElement {
  const camera = useRef<Camera>(null);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [gravando, setGravando] = useState<boolean>(false);
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [tempoGravacao, setTempoGravacao] = useState<number>(0);

  const isFocused = useIsFocused();
  const nav: any = useNavigation();

  const device = useCameraDevice(cameraPosition);

  useEffect(() => {
    const initializePermissions = async () => {
      if (Platform.OS === 'ios') {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
          console.log('Permissões não concedidas ao carregar a página');
        }
      }
    };
    initializePermissions();
  }, []);

  const formatarTempo = (segundos: number): string => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    let intervalo: any = null;

    if (gravando) {
      intervalo = setInterval(() => {
        setTempoGravacao(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalo) {
        clearInterval(intervalo);
      }
      setTempoGravacao(0);
    }

    return () => {
      if (intervalo) {
        clearInterval(intervalo);
      }
    };
  }, [gravando]);

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const cameraStatus = await check(PERMISSIONS.IOS.CAMERA);
      if (cameraStatus !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        if (result !== RESULTS.GRANTED) {
          Alert.alert(
            'Permissão Necessária',
            'O aplicativo precisa de permissão para acessar a câmera. Por favor, conceda a permissão nas configurações.',
            [
              {text: 'Cancelar', style: 'cancel'},
              {
                text: 'Abrir Configurações',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Erro ao verificar permissões:', error);
      Alert.alert('Erro', 'Falha ao verificar permissões.');
      return false;
    }
  };

  const toggleGravacao = async (): Promise<void> => {
    if (!gravando) {
      if (!camera.current) {
        Alert.alert('Erro', 'Câmera não disponível.');
        return;
      }

      if (!device) {
        Alert.alert('Erro', 'Nenhum dispositivo de câmera disponível.');
        return;
      }

      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      try {
        setPontos([]);
        await camera.current.startRecording({
          onRecordingFinished: async (video: VideoFile) => {
            const fileExtension = '.mov';
            const fileName = `meu_video_${Date.now()}${fileExtension}`;
            const baseDir = `${RNFS.DocumentDirectoryPath}/Movies`;
            const novoCaminho = `${baseDir}/${fileName}`;
            const normalizedPath = `file://${novoCaminho}`;

            try {
              const dirExists = await RNFS.exists(baseDir);
              if (!dirExists) await RNFS.mkdir(baseDir);

              await RNFS.moveFile(video.path, novoCaminho);
              setVideoPath(normalizedPath);
              nav.navigate('detalhes', {
                videoPath: normalizedPath,
                pontos,
                name: 'camera',
              });
            } catch (error: any) {
              console.error('Erro ao mover vídeo:', error);
              Alert.alert('Erro', `Falha ao mover o vídeo: ${error.message}`);
              setVideoPath(video.path);
              nav.navigate('detalhes', {
                videoPath: video.path,
                pontos,
                name: 'camera',
              });
            }
          },
          onRecordingError: (error: Error) => {
            console.error('Erro ao gravar:', error);
            Alert.alert('Erro', `Falha ao gravar o vídeo: ${error.message}`);
            setGravando(false);
          },
        });
        setGravando(true);
      } catch (error: any) {
        console.error('Erro ao iniciar gravação:', error);
        Alert.alert(
          'Erro',
          `Não foi possível iniciar a gravação: ${error.message}`,
        );
      }
    } else {
      try {
        await camera.current?.stopRecording();
        setGravando(false);
      } catch (error: any) {
        console.error('Erro ao parar gravação:', error);
        Alert.alert('Erro', `Erro ao parar a gravação: ${error.message}`);
      }
    }
  };

  const handleToque = (event: {
    nativeEvent: {pageX: number; pageY: number};
  }): void => {
    if (gravando) {
      if (pontos.length >= 3) {
        Alert.alert('Limite Atingido', 'Você já marcou o máximo de 3 pontos.');
        return;
      }

      const {pageX, pageY} = event.nativeEvent;
      const novoPonto: Ponto = {x: pageX, y: pageY, timestamp: Date.now()};
      setPontos((prev: Ponto[]) => [...prev, novoPonto]);

      Alert.alert(
        'Ponto Gravado',
        `Ponto ${pontos.length + 1} marcado!\nPosição: (${Math.round(
          pageX,
        )}, ${Math.round(pageY)})\nTimestamp: ${novoPonto.timestamp}`,
        [{text: 'OK'}],
      );
    }
  };

  if (!device) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Nenhuma câmera disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused}
        video={true}
        audio={false}
      />
      <TouchableWithoutFeedback onPress={handleToque}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        {gravando && (
          <Text style={styles.cronometroTexto}>
            {formatarTempo(tempoGravacao)}
          </Text>
        )}
        <TouchableWithoutFeedback onPress={toggleGravacao}>
          <View style={gravando ? styles.botaoParar : styles.botaoGravar}>
            <Text style={styles.botaoTexto}>
              {gravando ? 'Parar' : 'Gravar'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  overlay: {...StyleSheet.absoluteFillObject},
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  botaoGravar: {
    width: 80,
    height: 80,
    backgroundColor: 'green',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoParar: {
    width: 80,
    height: 80,
    backgroundColor: 'red',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  cronometroTexto: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 5,
    borderRadius: 5,
  },
});
