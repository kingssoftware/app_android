export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootNavigationProfRoutes = { 
  agendamento: { selectedDate: string },
  home_profissional: undefined,
  register_user: undefined,
}

export type RootNavigationClienteRoutes = { 
  agendamento: { selectedDate: string },
  register_user: undefined,
  camera: undefined,
  home_cliente: undefined, 
  home_solicitation: undefined,
  detalhes: undefined
}