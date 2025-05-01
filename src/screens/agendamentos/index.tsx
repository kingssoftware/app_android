import api from '../../config/api';
import History from '../../component/HistoryDiagnostic';
import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {format} from 'date-fns';
import {nb} from 'date-fns/locale'; // Locale norueguês
import FlaskModal from '../../component/FlaskModal';

// Interface atualizada para os dados de cada agendamento
interface Agendamento {
  id: number;
  nome: string;
  tipo: string;
  horarioInicio: string;
  horarioFim: string;
}

// Interface para as props do componente Agendamento
interface AgendamentoProps {
  route: {
    params: {
      selectedDate: string;
    };
  };
}

const Agendamentos: React.FC<AgendamentoProps> = ({route}) => {
  const {selectedDate} = route.params;
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    {
      id: 1,
      nome: 'Vinicius',
      tipo: 'Particular',
      horarioInicio: '09:00',
      horarioFim: '09:30',
    },
    {
      id: 2,
      nome: 'Julio Junqueira',
      tipo: 'Particular',
      horarioInicio: '14:00',
      horarioFim: '14:30',
    },
  ]);

  const [isModalHistory, setIsModalHistory] = useState(false);

  const [selectedAgendamento, setSelectedAgendamento] =
    useState<Agendamento | null>(null);

  // Formatar a data para "d. MMMM yyyy" em norueguês
  const formattedDate = format(new Date(selectedDate), 'd. MMMM yyyy', {
    locale: nb,
  });

  // Buscar os agendamentos quando a data mudar
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get(`/agendamentos?data=${selectedDate}`);
        setAgendamentos(response.data); // A API deve retornar dados compatíveis com a nova interface
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };
    fetchAgendamentos();
  }, [selectedDate]);

  // Função para renderizar cada item da lista com cronograma
  const renderItem = ({item}: {item: Agendamento}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedAgendamento(item);
        setIsModalHistory(true);
      }}>
      <View style={localStyle.timelineContainer}>
        {/* Cronograma à esquerda */}
        <View style={localStyle.timeline}>
          <Text style={localStyle.timelineText}>{item.horarioInicio}</Text>
          <View
            style={[
              localStyle.timelineDot,
              {
                backgroundColor:
                  item.tipo === 'Particular' ? '#007AFF' : '#FFA500',
              },
            ]}
          />
        </View>
        {/* Cartão do agendamento */}
        <View
          style={[
            localStyle.item,
            {
              backgroundColor:
                item.tipo === 'Particular' ? '#ADD8E6' : '#FFA07A',
            },
          ]}>
          <Text style={localStyle.nome}>{item.nome}</Text>
          <Text style={localStyle.tipo}>{item.tipo}</Text>
          <Text
            style={
              localStyle.horario
            }>{`${item.horarioInicio} - ${item.horarioFim}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={localStyle.container}>
      {/* Data formatada */}
      <Text style={localStyle.title}>{formattedDate}</Text>

      {/* Lista de agendamentos */}
      <FlatList
        data={agendamentos}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
      />

      <FlaskModal
        visible={isModalHistory}
        onClose={() => setIsModalHistory(false)}
        title=""
        content={
          <View style={{zIndex: 10, height: hp('85%'), width: wp('92%')}}>
            {selectedAgendamento && (
              <History
                selectedDate={selectedDate}
                horarioInicio={selectedAgendamento.horarioInicio}
                horarioFim={selectedAgendamento.horarioFim}
              />
            )}
          </View>
        }
      />
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    margin: wp('4%'),
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp('2%'),
  },
  timeline: {
    width: wp('15%'),
    alignItems: 'center',
  },
  timelineText: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  item: {
    flex: 1,
    borderRadius: 10,
    padding: wp('4%'),
    marginVertical: hp('1%'),
    marginRight: wp('4%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalFooter: {
    alignItems: 'center',
    paddingTop: 10,
  },
  nome: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  tipo: {
    fontSize: wp('4%'),
    color: '#666',
  },
  horario: {
    fontSize: wp('4%'),
    color: '#333',
  },
  icon: {
    position: 'absolute',
    right: wp('4%'),
    top: wp('4%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo mais escuro para destaque
  },
  modalContent: {
    width: wp('95%'), // Aumentei um pouco o tamanho
    height: hp('95%'),
    backgroundColor: '#F9F9F9', // Cor de fundo mais suave
    borderRadius: 15, // Bordas mais arredondadas
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: wp('6.5%'),
    fontWeight: 'bold',
    color: '#007AFF', // Cor azul para destacar
    marginBottom: hp('3%'),
    textAlign: 'center',
  },
  modalDetails: {
    width: '100%',
    paddingHorizontal: wp('2%'),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Linha sutil para separar
    paddingBottom: hp('1%'),
  },
  detailLabel: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#555',
  },
  detailValue: {
    fontSize: wp('4.5%'),
    color: '#333',
    textAlign: 'right',
  },
  closeButton: {
    marginTop: hp('3%'),
    backgroundColor: '#FF3B30', // Vermelho para contraste
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});

export default Agendamentos;
