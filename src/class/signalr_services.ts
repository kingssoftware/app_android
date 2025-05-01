import * as signalR from '@microsoft/signalr';
import { _user } from '../services/login_services';
import { WEB_SOCKET } from '@env';

interface User {
  token: string;
}

interface Message {
  id: string;
  mensagem: string;
  timestamp: string;
  Angrão: string;
}

interface ProfessionalData {
  id: string;
  name?: string;
}

export class SignalRService {
  private connection: signalR.HubConnection | null = null;

  async startConnection(): Promise<void> {
    try {
      const user: User | null = await _user();
      if (!user || !user.token) {
        throw new Error('Usuário não autenticado ou token não encontrado.');
      }

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(WEB_SOCKET, {
          accessTokenFactory: () => user.token,
          skipNegotiation: false, // Garante que a negociação ocorra
          transport: signalR.HttpTransportType.WebSockets, // Força WebSockets
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      console.log('Estado inicial da conexão:', this.connection.state);
      await this.connection.start();
      console.log('Conexão com SignalR estabelecida. Estado:', this.connection.state);

      this.connection.on('JoinedGroup', (message: string) => {
        console.log('Evento JoinedGroup:', message);
      });

      this.connection.on('ReceiveMessage', (message: Message) => {
        console.log('Mensagem recebida:', message);
      });

      this.connection.onclose((error?: Error) => {
        console.error('Conexão SignalR fechada:', error);
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao iniciar conexão com SignalR:', error.message, error.stack);
      } else {
        console.error('Erro desconhecido ao iniciar conexão com SignalR:', error);
      }
    }
  }

  async AddProfInGroup (professionalData: ProfessionalData): Promise<void> {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      try {
        await this.connection.invoke('ProfAddGroup', professionalData.id);
        console.log(`Profissional adicionado no grupo: ${professionalData.id}`);
      } catch (error: unknown) {
        console.error('Erro ao invocar ProfRequest:', error);
      }
    } else {
      console.error('Conexão SignalR não está ativa.');
    }
  }


  // async InvokeSolicitationBruker(professionalData: ProfessionalData): Promise<void> {
  //   try {
  //     await this.connection?.invoke('JoinGroup', `GroupProf_${professionalData.id}`);
  //     console.log(`Entrou no grupo: GroupProf_${professionalData.id}`);

  //     this.connection?.on('Solicitation', (resp) => {
  //       console.log('Solicitação recebida:', resp);
  //     });
  //   } catch (error: unknown) {
  //     console.error('Erro ao configurar SignalR:', error);
  //   }
  // }

  async InvokeSolicitationBruker(professionalData: ProfessionalData): Promise<any> {
    try {
      // Ingressa no grupo
      await this.connection?.invoke('JoinGroup', `GroupProf_${professionalData.id}`);
  
      // Retorna uma Promise que será resolvida quando o evento Solicitation for disparado
      return new Promise((resolve, reject) => {
        this.connection?.on('Solicitation', (resp) => {
          resolve(resp); // Resolve a Promise com o resp recebido
        });
  
        // Opcional: Tratar caso o evento não ocorra ou ocorra um erro
        this.connection?.on('error', (error) => {
          console.error('Erro no SignalR:', error);
          reject(error); // Rejeita a Promise em caso de erro
        });
      });
    } catch (error: unknown) {
      console.error('Erro ao configurar SignalR:', error);
      throw error; // Propaga o erro para o chamador
    }
  }


  async RemoveProfInGroup(professionalData: ProfessionalData): Promise<void> {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      try {
        await this.connection.invoke('ProfRemoveGroup', professionalData.id);
        console.log(`Profissional removido do grupo: ${professionalData.id}`);
      } catch (error: unknown) {
        console.error('Erro ao invocar ProfRequest:', error);
      }
    } else {
      console.error('Conexão SignalR não está ativa.');
    }
  }

  async brukerRequest(): Promise<void> {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      try {
        await this.connection.invoke('BrukerRequest');
        console.log('BrukerRequest invocado com sucesso.');
      } catch (error: unknown) {
        console.error('Erro ao invocar BrukerRequest:', error);
      }
    } else {
      console.error('Conexão SignalR não está ativa.');
    }
  }

  async sendMessage(
    clienteId: string,
    profissionalId: string,
    mensagem: string
  ): Promise<void> {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      try {
        await this.connection.invoke(
          'SendMessage',
          clienteId,
          profissionalId,
          mensagem
        );
        console.log('Mensagem enviada com sucesso.');
      } catch (error: unknown) {
        console.error('Erro ao enviar mensagem:', error);
      }
    } else {
      console.error('Conexão SignalR não está ativa.');
    }
  }

  async stopConnection(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
        console.log('Conexão SignalR encerrada.');
      } catch (error: unknown) {
        console.error('Erro ao encerrar conexão SignalR:', error);
      }
    }
  }
}