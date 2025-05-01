import context_realm from '../db_context/index';
import iRespostaItem from '../types/iRespostaItem';

export const _saveAllQuestion = async (lstQuestions: iRespostaItem[]) => {
  try {
    const realm = await context_realm();

    realm.write(() => {
      // Remove dados antigos se necessário
      const existing = realm.objects('Perguntas');
      realm.delete(existing);

      lstQuestions.forEach((item, index) => {
        realm.create('Perguntas', {
          objID: index + 1,
          pergunta: item.pergunta,
          resposta: item.resposta,
        });
      });
    });

    console.log('Perguntas salvas com sucesso no Realm.');
  } catch (error) {
    console.log('Erro ao salvar perguntas no Realm:', error);
  }
};


/** Atualiza a resposta de uma pergunta pelo objID */
export const _updateQuestion = async (objID: number, newAnswer: string) => {
  try {
    const realm = await context_realm();

    realm.write(() => {
      // Encontra o item com objID específico
      const questionToUpdate = realm.objectForPrimaryKey('Perguntas', objID);

      if (questionToUpdate) {
        // Atualiza a resposta
        questionToUpdate.resposta = newAnswer;
        console.log(`Resposta da pergunta com objID ${objID} foi atualizada para: ${newAnswer}`);
      } else {
        console.log(`Pergunta com objID ${objID} não encontrada.`);
      }
    });
  } catch (error) {
    console.log('Erro ao atualizar resposta no Realm:', error);
  }
};

/** Recupera todas as perguntas salvas no Realm */
export const _getAllQuestions = async (): Promise<iRespostaItem[]> => {
  try {
    const realm = await context_realm();

    // Obtém todos os objetos de Perguntas
    const questions = realm.objects('Perguntas');

    // Converte os objetos do Realm para um array de iRespostaItem
    const questionList: iRespostaItem[] = questions.map((question: any) => ({
      pergunta: question.pergunta,
      resposta: question.resposta,
    }));

    return questionList;
  } catch (error) {
    console.log('Erro ao buscar perguntas no Realm:', error);
    return [];
  }
};


/** Calcula o score baseado nas respostas "Ja" e no número total de perguntas */
export const calculateScore = async (setScore: (score: number) => void) => {
  try {
    const realm = await context_realm();

    // Obtém todas as perguntas salvas no Realm
    const questions = realm.objects('Perguntas');

    // Conta o número de respostas "Ja"
    let jaCount = 0;
    questions.forEach((item: any) => {
      if (item.resposta === 'Ja') {
        jaCount += 1;
      }
    });

    // Calcula o score com base no número total de perguntas
    const totalQuestions = questions.length;
    const score = totalQuestions > 0 ? jaCount / totalQuestions : 0; // Proporção de "Ja" em relação ao total

    console.log('Score Calculado:', score); // Para depuração
    setScore(score); // Atualiza o estado do score
  } catch (error) {
    console.log('Erro ao calcular o score:', error);
    setScore(0); // Se der erro, retorna 0
  }
};