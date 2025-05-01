import api from "../config/api";


export const _fetchUsuarioEnderecoByUser = async (idUser: string) => {
  const lst_endereco = await api.get(`/EnderecoUsuario/FindByUser?IdUsuario=${idUser}`);
  return lst_endereco.data;
};

/**
 * Método responsavel por registrar o endereço do usuário.
 * @param oEndereco essa variável é responsavel por obter os dados do endereço do usuário à ser registrado.
 * @returns valor boolean.
 */
export const _postUsuarioEndereco = async (oEndereco: iEndereco): Promise<boolean> => {
  const resp: any = await api.post('/EnderecoUsuario ', oEndereco, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (resp.data.isValid) {
    return true;
  } else {
    return false;
  }
};

export const _updateUsuarioEndereco = async (oEndereco: iEndereco): Promise<boolean> => {
  try {
    const obj: any = {
      objID: oEndereco.objID,
      idUsuario: oEndereco.idUsuario,
      rua: oEndereco.rua,
      cidade: oEndereco.cidade,
      codigo_postal: oEndereco.codigo_postal,
      numero: oEndereco.numero ? parseInt(oEndereco.numero) : 0,
      pais: '',
    };

    const resp: any = await api.put(`/EnderecoUsuario?objID=${obj.objID}`, obj, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(resp);

    if (resp.data.isValid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Erro ao carregar');
    console.log(error);
    return false;
  }
};

export const _removeUsuarioEndereco = async (IdEndereco: string): Promise<boolean> => {
  const resp: any = await api.delete(`/EnderecoUsuario?objID=${IdEndereco}`);
  if (resp.data.isValid) {
    return true;
  } else {
    return false;
  }
};
