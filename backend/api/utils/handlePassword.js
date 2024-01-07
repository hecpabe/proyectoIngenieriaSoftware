const bycryptjs = require("bcryptjs")

//encripta la contraseña
const encrypt = async (clearPassword) =>{

   // El número "Salt" otorga aleatoriedad a la función hash al combinarla con la password en claro. El 10 es la semilla del num random
   const hash = await bycryptjs.hash(clearPassword, 10)
   return hash
}

//compara la contraseña devuelve true si es correcta y false si no lo es
const compare = async (clearPassword, hashedPassword)=>{
    // Compara entre la password en texto plano y su hash calculado anteriormente para decidir si coincide.
    const result = await bycryptjs.compare(clearPassword, hashedPassword)
    return result
}

module.exports = {encrypt, compare}