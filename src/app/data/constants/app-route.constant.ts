export class AppRoute {
  static readonly DIRECCION_MONITOREO = 'management';
  static readonly AUTH = 'auth';
  static readonly REGISTER = 'register';
  // ADMINISTRACIÓN ----------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------- PACIENTES
  static readonly MOD_PACIENTES = 'pacientes';
  // --------------------------------------------------------------------------------------------------------------- EPISODIOS
  static readonly MOD_EPISODIOS = 'episodios';
  // --------------------------------------------------------------------------------------------------------- CONTROL CABINAS
  static readonly MOD_CONTROL = 'control-cabinas';
  // -------------------------------------------------------------------------------------------------------------- RESULTADOS
  static readonly MOD_RESULTADOS = 'resultados';
  // -------------------------------------------------------------------------------------------------------------------------
  
  static readonly APP = 'app';
  static readonly ADMIN = 'admin';
  static readonly USUARIOS = 'users';
  static readonly EDIT_USER = 'edit-user';
  static readonly UNIDADES_OPERATIVAS = 'unidades-operativas';
  static readonly SERVICIOS = 'cartera-de-servicios';
  static readonly DASHBOARD_GLOBAL = 'dashboard';
  //---------------------------------------------------------------------------------------------------------- RUTAS HORARIOS
  static readonly HORARIOS = 'schedule';
  static readonly CREAR_HORARIO = `create-${this.HORARIOS}`;
  static readonly EDIT_HORARIO = `edit-${this.HORARIOS}`;
  static readonly HORARIOS_BUSCAR = 'search';
  static readonly HORARIOS_CONFIGURAR = 'config';

  //---------------------------------------------------------------------------------------------------------- RUTAS ATENCIONES
  static readonly ATENCIONES = 'attention';
  // static readonly ATENCIONES_APERTURA = 'apertura';
  static readonly ATENCIONES_PENDIENTES = 'pending';
  static readonly ATENCIONES_ATENDIDOS = 'attended';
  static readonly ATENCIONES_NO_ATENDIDOS = 'not-attended';
  static readonly ATENCIONES_HISTORIAL = 'historial';

}
