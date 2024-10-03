export enum StorageKeys {
  ACCESOS = "_accesos",
  APLICACION = "_aplicacion",
  MODULOS = "_modulos",
  PERSONA = "_persona",
  ROL = "_rol",
  USER = "_user",
  USER_TOKEN = "_token",
  LOGGED = "_logged",
  CARGO = "_cargo",
}

// Los nombres de los modulos deben ir en plural
export enum ModulosSistema {
  // -------- SEGURIDAD --------
  ACCESOS = "accesos",
  APLICACIONES = "aplicaciones",
  BITACORA = "bitacora",
  CARGOS = "cargos",
  COMPONENTES = "componentes",
  DIVISIONES = "divisiones",
  UNIDADES_NEGOCIO = "unidades_negocio",
  EMPRESA = "empresas",
  MODULOS = "modulos",
  PERSONAS = "personas",
  ROLES = "roles",
  ROL_ASIGNACION = "rol_asignacion",
  USUARIOS = "users",

  // -------- SISTEMA ACTUAL --------
}

export enum TipoAcceso {
  INDEX = "_index",
  INSERT = "_insert",
  UPDATE = "_update",
  DELETE = "_delete",
}

export enum ApiEndpoints {
  // -------- SEGURIDAD --------
  ACCESOS = "accesos",
  APLICACIONES = "aplicaciones",
  APLICACIONES_CON_ROLES = "aplicaciones?habilitado=1&roles=1",
  BITACORA = "bitacoras",
  COMPONENTES = "componentes",
  DIVISIONES = "divisiones",
  ELIMINAR_USUARIO_ROL = "eliminar-usuario-rol",
  EMPRESAS = "empresas",
  HABILITAR_COMPONENTES = "componentes/habilitar",
  HABILITAR_EMPRESAS = "empresas/habilitar",
  HABILITAR_MODULOS = "modulos/habilitar",
  HABILITAR_PERSONAS = "personas/habilitar",
  HABILITAR_ROL_ASIGNACION = "rol-asignaciones/habilitar",
  HABILITAR_ROLES = "roles/habilitar",
  HABILITAR_USERS = "users/habilitar",
  LOGIN = "aut/login",
  MODULOS = "modulos",
  MODULOS_BY_APP = "modulos/app",
  PERSONAS = "personas",
  PERSONAS_V2 = "personas/v2",
  FILTRAR_PERSONAS = "personas/filtrar",
  IMPORTAR_PERSONAS = "personas-upload",
  ROL_ASIGNACION = "rol-asignaciones",
  ROLES = "roles",
  ROLES_ACCESOS = "roles/accesos",
  UNIDAD_NEGOCIO = "unidades-negocio",
  USERS = "users",
  USUARIO_ROL = "usuario-rol",
  CARGOS = "cargos",
  USUARIO_ROL_BASE = "usuario-rol/set-rol-base",

  // -------- SISTEMA ACTUAL --------
}

export enum Messages {
  NO_SE_PUDO_COMPLETAR = "No se pudo completar la operación",
  OPERACION_CORRECTA = "Operación correcta",
}

// export enum IconNames {
//   Add = 'Add',
//   AddCircle = 'AddCircle',
//   AddPhoto = 'AddPhotoAlternateIcon',
//   Android = 'Android',
//   Apple = 'Apple',
//   Apps = 'Apps',
//   Archive = 'Archive',
//   AttachFile = 'AttachFile',
//   Backup = 'Backup',
//   Block = 'Block',
//   Bolt = 'Bolt',
//   Bookmark = 'Bookmark',
//   Build = 'Build',
//   Business = 'Business',
//   CalendarMonthIcon = 'CalendarMonthIcon',
//   Call = 'Call',
//   CameraAlt = 'CameraAlt',
//   Check = 'Check',
//   CLOCK = 'AccessTime',
//   Close = 'Close',
//   Coffee = 'Coffee',
//   Computer = 'Computer',
//   ContentCopy = 'ContentCopy',
//   ContentCut = 'ContentCut',
//   ContentPaste = 'ContentPaste',
//   Home = 'Home',
//   Man = 'Accessibility',
//   PeopleAlt = 'PeopleAlt',
//   Extension = 'Extension',
//   Wallet = 'AccountBalanceWalletIcon',
// }
