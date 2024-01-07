const { handleHttpError } = require("../utils/handleHttpError.js")

const checkRol = (roles) => (req, res, next) => { // Doble argumento
    try{
        
        const {user} = req
        const userType = user.CategoriaLaboral
        //console.log(userType)
        const checkValueRol = roles.includes(userType)//Comprobamos que el rol del usuario esté en roles
        
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    }catch(err){
        
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol