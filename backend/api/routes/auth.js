const express = require("express")
const router = express.Router()
const { handleHttpError } = require('../utils/handleHttpError.js')
const {validatorRegister, validatorLogin} = require("../validators/auth.js")
const { registerCtrl,loginCtrl, registerAdminCtrl } = require("../controllers/auth.js")
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')

router.post("/register",validatorRegister, registerCtrl) ;

router.post("/login", validatorLogin, loginCtrl);

module.exports = router