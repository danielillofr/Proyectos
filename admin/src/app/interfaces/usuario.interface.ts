export interface TipoUsuario {
  _id: String,
  nombre: String,
  nombreCompleto: String,
  role: String
}

export interface RespuestaListaUsuarios {
  ok: boolean,
  errBaseDatos?: boolean,
  err?: String,
  usuarios: TipoUsuario[]
}

export interface RespuestaTipoLogin {
  ok: boolean,
  errBaseDatos?: boolean,
  err?: String,
  usuario: TipoUsuario,
  token: String
}
