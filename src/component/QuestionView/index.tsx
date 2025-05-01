import api from '../../config/api';
import iRespostaItem from '../../types/iRespostaItem';

import { View, StyleSheet, TouchableOpacity, Image, Alert, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { _saveAllQuestion, _updateQuestion } from '../../services/perguntas_services';

const QuestionsView = () => {
  const [respostasCompletas, setRespostasCompletas] = useState<iRespostaItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const loading_question = async () => {
    try {
      const qst = await api.get('/QuestionBruker');
      const lista: iRespostaItem[] = qst.data.map((item: any) => ({
        pergunta: item.questionTexts,
        resposta: 'Ikke definert',
      }));

      if (lista.length > 0) {
        setRespostasCompletas(lista);
        await _saveAllQuestion(lista); 
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as perguntas.');
    }
  };

  useEffect(() => {
    loading_question();
  }, []);



  /** Atualiza resposta da pergunta atual */
  const handleAnswerChange = async (index: number, value: string) => {
    const updated = [...respostasCompletas];
    updated[index].resposta = value;
    setRespostasCompletas(updated);

    const objID: number = (index + 1)

    await _updateQuestion(objID, value)

    if (index < respostasCompletas.length - 1) {
      setCurrentQuestion(index + 1);
    }
  };

  const perguntaAtual = respostasCompletas[currentQuestion];

  return (
    <View style={styles.mainContainer}>
      {perguntaAtual && (
        <>
          {/* Pergunta acima */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              <Text style={{ fontWeight: 'bold' }}>{currentQuestion + 1}. </Text>
              {perguntaAtual.pergunta}
            </Text>
          </View>

          {/* Linha horizontal com setas entre os botões */}
          <View style={styles.answerRow}>
            {/* Seta esquerda */}
            <TouchableOpacity
              onPress={() => setCurrentQuestion((prev) => prev - 1)}
              disabled={currentQuestion === 0}
              style={styles.navButton}
            >
              <Image
                source={require('../../assets/icons/seta-esquerda.png')}
                style={[
                  styles.navIcon,
                  currentQuestion === 0 && { opacity: 0.3 },
                ]}
              />
            </TouchableOpacity>

            {/* Botão Ja */}
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleAnswerChange(currentQuestion, 'Ja')}
            >
              <View style={styles.radioCircle}>
                {perguntaAtual.resposta === 'Ja' && <View style={styles.selectedRb} />}
              </View>
              <Text style={styles.radioLabel}>Ja</Text>
            </TouchableOpacity>

            {/* Botão Nei */}
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleAnswerChange(currentQuestion, 'Nei')}
            >
              <View style={styles.radioCircle}>
                {perguntaAtual.resposta === 'Nei' && <View style={styles.selectedRb} />}
              </View>
              <Text style={styles.radioLabel}>Nei</Text>
            </TouchableOpacity>

            {/* Seta direita */}
            <TouchableOpacity
              onPress={() => setCurrentQuestion((prev) => prev + 1)}
              disabled={currentQuestion >= respostasCompletas.length - 1}
              style={styles.navButton}
            >
              <Image
                source={require('../../assets/icons/seta-direita.png')}
                style={[
                  styles.navIcon,
                  currentQuestion >= respostasCompletas.length - 1 && { opacity: 0.3 },
                ]}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3.5%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
  },
  questionContainer: {
    marginBottom: hp('4%'),
    paddingHorizontal: wp('4%'),
  },
  questionText: {
    fontSize: hp('2.3%'),
    textAlign: 'center',
    fontWeight: '600',
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('90%'),
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    width: wp('7%'),
    height: hp('4%'),
    resizeMode: 'contain',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: hp('3%'),
    width: hp('3%'),
    borderRadius: hp('1.5%'),
    borderWidth: 2,
    borderColor: '#2e86de',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: hp('1.5%'),
    height: hp('1.5%'),
    borderRadius: hp('0.75%'),
    backgroundColor: '#2e86de',
  },
  radioLabel: {
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default QuestionsView;
