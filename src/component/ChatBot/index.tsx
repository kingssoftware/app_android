import api from '../../config/api';
import axios from 'axios';
import uuid from 'react-native-uuid';

import {useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {TouchableOpacity, Keyboard, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {GROK_KEY} from '@env';

const cleanText = (text: string) => {
  return text.replace(/\*\*/g, '').trim();
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  // Função para buscar respostas da API interna
  const fetchResponseFromAPI = async (userMessage: string) => {
    try {
      const response = await api.get(`/ChatbotMessage?text=${userMessage}`);

      if (response.status === 200 && Array.isArray(response.data)) {
        const data = response.data;

        const matchingResponses = data.filter(
          item =>
            item.name.toLowerCase().includes(userMessage) ||
            item.description.toLowerCase().includes(userMessage),
        );

        if (matchingResponses.length > 0) {
          return matchingResponses
            .map(item => `• ${item.name}\n   ${item.description}`)
            .join('\n\n');
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error('Erro ao buscar resposta da API:', error);
      return 'Feil ved å konsultere API-en. Prøv igjen senere.';
    }
  };

  // Função para buscar respostas do Grok com mensagem de sistema
  const fetchGrokResponse = async (userMessage: string) => {
    try {
      const response = await axios.post(
        'https://api.x.ai/v1/chat/completions',
        {
          model: 'grok-2-vision-1212',
          messages: [
            {
              role: 'user',
              content: `${userMessage}\n\nNå, vennligst gi ytterligere forslag til hva brukeren kan gjøre.`,
            },
          ],
          stream: false, // Alinhado com o exemplo
          temperature: 0, // Alinhado com o exemplo
          max_tokens: 200000, // Mantido do seu código
        },
        {
          headers: {
            Authorization: `Bearer ${GROK_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(response);
      console.log(userMessage);

      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        return cleanText(response.data.choices[0].message.content.trim());
      } else {
        return 'Kunne ikke generere flere forslag for øyeblikket. Prøv igjen senere.';
      }
    } catch (error: any) {
      console.error(
        'Erro ao chamar Grok API:',
        error.response?.data || error.message,
      );
      return 'Feil ved å behandle forespørselen din. Sjekk tilkoblingen din og prøv igjen.';
    }
  };

  // Função que lida com o envio das mensagens
  const sendMessage = async (newMessages: any = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );

    const userMessage = newMessages[0].text.toLowerCase();

    let apiResponse: any = await fetchResponseFromAPI(userMessage);

    let finalResponse = apiResponse;

    if (apiResponse) {
      const grokComplement = await fetchGrokResponse(userMessage);
      finalResponse = `${apiResponse}\n\n💡 Ytterligere forslag:\n${grokComplement}`;
    } else {
      finalResponse = await fetchGrokResponse(userMessage);
    }

    try {
      setMessages((previousMessages: any) =>
        GiftedChat.append(previousMessages, {
          _id: uuid.v4().toString(),
          text: finalResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chatbot',
          },
        }),
      );
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  // Componente customizado para o botão de envio
  const CustomSendButton = (props: any) => {
    const {onSend, text, textInputRef, ...otherProps} = props;

    const handleSend = () => {
      if (text && text.trim().length > 0) {
        onSend([{text, user: {_id: 1}, _id: Math.random().toString()}], true);
        if (textInputRef && textInputRef.current) {
          textInputRef.current.clear();
        }
        Keyboard.dismiss();
      }
    };

    return (
      <TouchableOpacity
        {...otherProps}
        style={{marginRight: 10, marginBottom: hp('2%')}}
        onPress={handleSend}>
        <Text style={{fontSize: 18, color: '#007bff'}}>Send</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages: any) => sendMessage(newMessages)}
      user={{_id: 1}}
      placeholder="Skriv inn spørsmålet ditt..."
      renderSend={(props: any) => (
        <CustomSendButton {...props} textInputRef={props.textInputRef} />
      )}
    />
  );
};

export default Chatbot;
