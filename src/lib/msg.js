const Ok = { msg: "", message: "", data: {} };
const noContent = { msg: "204", message: "Datos no existen", data: {} };
const badRequest = {
  msg: "400",
  message: "Solicitud errada",
  data: {}
}; /** 401 Unauthorized */
const stateNull = {
  msg: "400",
  message: "Estado no definido",
  data: {}
}; /** 400 Forbidden */
const stateNotChange = {
  msg: "400",
  message: "Estado es igual",
  data: {}
}; /** 400 Forbidden */
const unAuthorized = {
  msg: "401",
  message: "Usuario no autenticado",
  data: {}
}; /** 401 Unauthorized */
const paymentRequired = {
  msg: "402",
  message: "Pago requerido",
  data: {}
}; /** 402 Payment Required */
const forbidden = {
  msg: "403",
  message: "Usuario no autorizado",
  data: {}
}; /** 403 Forbidden */
const MSG0001 = "Usuario requerido";
const MSG0002 = "Contraseña requerida";
const MSG0003 = "Datos incorrectos";
const MSG0004 = "Error sistema";
const MSG0005 = "Usuario no valido";
const MSG0006 = "Tamaño de la contraseña debe ser mayor de 8 caracteres";
const MSG0007 = "Contraseña no corresponde";
const MSG0008 = "Nombre de usuario no es un numero celular valido";
const MSG0009 = "Confirmación de contraseña no corresponde";
const MSG0010 = "Nombre requerido";
const MSG0011 = "Nombre de projecto requerido";
const MSG0012 = "Modulo requerido";
const MSG0013 = "Ciudad requerida";
const MSG0014 = "Código requerido";
const MSG0015 = "App requerida";
const MSG0016 = "El usuario fue borrado";
const MSG0017 = "El usuario ya existe";
const MSG0018 = "El codigo de confirmación no es correcto";
const MSG0019 = "Datos no existen";
const MSG0020 = "¡Código del equipo no valido!";

module.exports = {
  Ok,
  noContent,
  badRequest,
  unAuthorized,
  paymentRequired,
  forbidden,
  stateNull,
  stateNotChange,
  MSG0001,
  MSG0002,
  MSG0003,
  MSG0004,
  MSG0005,
  MSG0006,
  MSG0007,
  MSG0008,
  MSG0009,
  MSG0010,
  MSG0011,
  MSG0012,
  MSG0013,
  MSG0014,
  MSG0015,
  MSG0016,
  MSG0017,
  MSG0018,
  MSG0019,
  MSG0020
};
