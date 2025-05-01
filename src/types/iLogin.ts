export interface iLogin {
  bruker: string;
  passord: string;
}

export interface iLoginAcess {
  objID: number | null | undefined;
  idTillatelse: string;
  token: string;
  forOgEtternavn: string;
  bruker: any;
  brukertype: string;
  expire: Date;
}