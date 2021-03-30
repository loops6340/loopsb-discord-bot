/* Descripción breve: Estos arrays sirven para compararlos con el posible mensaje
que puede llegar, por ejemplo, si un mensaje empieza con: hola, ola buenas, ya vine
ya llegue ya estoy acá, buen día, el bot dará una respuesta, esto lo hago haciendo
un array con estas posibles palabras de entrada, como pueden ver en el array de 
userRegards, el resto lo hace el metodo .some() y listo */

const userRegards = [ //saludos de usuario, esto se conecta lo de los saludos de bot
  "hola",
  "ola",
  "buenas",
  "ya vine",
  "ya llegue",
  "ya estoy acá",
  "buen dia",
]

export default { userRegards };