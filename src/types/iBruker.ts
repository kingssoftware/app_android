export interface iBruker {
    /** * Essa variável representa o nome e sobrenome do usuário! */
    forOgEtternavn: string;
  
    /** * Essa variável representa o telefone do usuário ou profissional! */
    telefonnummer: string;
  
    /** * Essa variável representa o endereço do usuário ou profissional! */
    prosjektadresse: string;
  
    /** * Essa variável representa a imagem do usuário.  */
    bilde: any;
  
    /** * Essa variável representa o código postal do usuário cliente ou profissional! */
    postnummer: string;
  
    /** * Essa variável representa o e-mail do usuário cliente ou profissional! */
    epost: string;
  
    /** * Essa variável representa a senhda do usuário cliente ou profissional! */
    passwoord: string;
  
    /** * Essa variável representa a confirmação de senha! */
    rePassword: string;
  
    /** * Essa variável representa o tipo de usuário como profissional ou cliente */
    brukertype: string;
  }