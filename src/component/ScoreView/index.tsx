import {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calculateScore} from '../../services/perguntas_services'; // Função para calcular o score

import {styles} from '../../style/boody';

import context_realm from '../../db_context/index'; // Seu contexto do Realm
import LinearGradient from 'react-native-linear-gradient';

const ScoreView = () => {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // Função assíncrona para carregar os dados do Realm
    const loadData = async () => {
      try {
        const realm = await context_realm(); // Obtemos o contexto do Realm
        const questions = realm.objects('Perguntas');

        // Define o observador para recalcular o score sempre que houver alterações nas perguntas
        const observer: any = questions.addListener(() => {
          calculateScore(setScore); // Recalcula o score
        });

        // Chama calculateScore para inicializar o score
        calculateScore(setScore);

        // Limpeza do observador quando o componente for desmontado
        return () => {
          // Remover o listener usando removeListener
          questions.removeListener(observer); // Remove o observador
        };
      } catch (error) {
        console.error('Erro ao carregar os dados do Realm:', error);
      }
    };

    loadData(); // Chama a função assíncrona dentro do useEffect
  }, []); // O useEffect só roda uma vez quando o componente é montado

  // Definir as 6 faixas de cores com os limites ajustados
  const segments = [
    {start: 0, end: 5, color: '#FFFF99'}, // Amarelo claro (Excelente)
    {start: 5, end: 15, color: '#FFFF00'}, // Amarelo
    {start: 15, end: 30, color: '#FFD700'}, // Amarelo dourado
    {start: 30, end: 66, color: '#FF8C00'}, // Laranja
    {start: 66, end: 83, color: '#FF4500'}, // Laranja escuro
    {start: 83, end: 100, color: '#B22222'}, // Vermelho escuro (Péssimo)
  ];

  // Normalizar o score e calcular a porcentagem
  const normalizedScore = Math.min(Math.max(score, 0), 1); // Usa o score
  const scorePercentage = normalizedScore * 100; // Converte para porcentagem

  // Extrair as cores e os pontos de transição (locations) do segments
  const colors = segments.map(segment => segment.color);
  const locations = segments.map(segment => segment.start / 100); // Normalizar para 0 a 1
  locations.push(1); // Adicionar o último ponto (100%)

  return (
    <View style={styles.container}>
      <View style={localStyle.container}>
        <View style={localStyle.barContainer}>
          {/* Barra de Gradiente com 6 faixas controladas por locations */}
          <LinearGradient
            colors={colors} // Lista de cores
            locations={locations} // Pontos de transição normalizados
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={localStyle.gradientBar}
          />
          {/* Fallback caso a imagem não carregue */}
          <View
            style={[localStyle.arrowFallback, {left: `${scorePercentage}%`}]}>
            <Text style={localStyle.arrowFallbackText}>▼</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  barContainer: {
    width: wp('95%'), // Largura com padding
    height: hp('2%'),
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff', // Borda branca como na imagem
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Sombra para Android
  },
  gradientBar: {
    flex: 1,
    height: '100%',
  },
  arrow: {
    position: 'absolute',
    bottom: hp('-0.5%'), // Ajustado para posicionar a seta logo abaixo da barra
    width: wp('5%'), // Reduzido para um tamanho mais proporcional
    height: hp('3%'),
    marginLeft: wp('-3%'), // Centraliza a seta
    tintColor: '#000', // Cor preta para a seta
    zIndex: 100,
  },
  arrowFallback: {
    position: 'absolute',
    bottom: hp('-2%'), // Mesmo posicionamento da seta
    marginLeft: wp('-2.5%'), // Centraliza
    zIndex: 50, // Menor que o da imagem, para ficar atrás se a imagem carregar
  },
  arrowFallbackText: {
    marginTop: hp('-5%'),
    fontSize: wp('5%'),
    color: '#000',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: wp('3%'), // Tamanho menor para o valor do score
    fontWeight: 'normal',
    color: '#fff', // Texto branco para contraste
    textAlign: 'center',
    marginTop: 2, // Espaço entre o texto do nível e o valor
  },
});

export default ScoreView;
