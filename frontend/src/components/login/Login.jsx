

/*
    Título: Login
    Descripción: Creamos un componente que gestione el incio de sesión de la aplicación
    Fecha: 27/11/2023
    Última Modificación: 12/12/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas básicas
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"

// Prime react
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password"
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Message } from "primereact/message"
import { Messages } from "primereact/messages"

// Bibliotecas de componentes propios
import { checkSessionToken } from "../../util/SessionUtils"

// Declaraciones constantes
const INPUT_FIELD_DEFAULT_CLASSNAME = "w-full mb-3"
const INPUT_FIELD_ERROR_CLASSNAME = INPUT_FIELD_DEFAULT_CLASSNAME + " p-invalid"

/* Componente Principal */
function Login({sessionToken, setSessionToken}){

    // Declaración de estados
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [remembermeValue, setRemembermeValue] = useState(false);

    const [loginUsernameInputClasses, setLoginUsernameInputClasses] = useState(INPUT_FIELD_DEFAULT_CLASSNAME);
    const [loginPasswordInputClasses, setLoginPasswordInputClasses] = useState(INPUT_FIELD_DEFAULT_CLASSNAME);

    const [loginUsernameInputAlert, setLoginUsernameInputAlert] = useState(null);
    const [loginPasswordInputAlert, setLoginPasswordInputAlert] = useState(null);

    const messagesQueue = useRef(null);

    const [queryParameters] = useSearchParams();
    const referrer = queryParameters.get(process.env.REACT_APP_REFERRER_PARAMETER_NAME) || "/";

    const navigate = useNavigate();

    // Si ya hay un token de sesión redirigimos directamente al referrer
    useEffect(() => {
        if(checkSessionToken(sessionToken))
            navigate(referrer);
    });

    // Codificación de funciones
    const loginUser = () => {

        // Variables necesarias
        var loginError = false;

        // Comprobación de datos en el front para evitar mandar peticiones innecesarias al back
        // TODO: En caso de que haya un usuario / email validar el formato
        if(usernameValue === ""){
            setLoginUsernameInputClasses(INPUT_FIELD_ERROR_CLASSNAME);
            setUsernameValue("");
            setRemembermeValue(false);
            setLoginUsernameInputAlert(<Message severity="error" text="Es necesario introducir el usuario" />)
            loginError = true;
        }

        if(passwordValue === ""){
            setLoginPasswordInputClasses(INPUT_FIELD_ERROR_CLASSNAME);
            setPasswordValue("");
            setRemembermeValue(false);
            setLoginPasswordInputAlert(<Message severity="error" text="Es necesario introducir la contraseña" />)
            loginError = true;
        }

        if(loginError)
            return;

        // Mandar la petición con los datos al back y obtenemos si ha ocurrido un error o no
        // TODO: Realizar la petición y evaluar la respuesta
        loginError = false

        // Si hay error mostramos el mensaje de error y resaltamos el error en los campos, si no hay error, almacenamos el token de sesión y redirigimos al dashboard
        if(loginError){

            // Resaltamos los campos como error
            setLoginUsernameInputClasses(INPUT_FIELD_ERROR_CLASSNAME)
            setLoginPasswordInputClasses(INPUT_FIELD_ERROR_CLASSNAME);

            // Limpiamos los campos
            setUsernameValue("");
            setPasswordValue("");
            setRemembermeValue(false);

            // Mostramos el mensaje de error
            messagesQueue.current.show([
                { severity: 'error', summary: 'Error de inicio de sesión', detail: 'Usuario o contraseña erroneos', sticky: true }
            ])

        }
        else{

            // Almacenamos el token de sesión en el navegador
            setSessionToken("test");

            // Redirigimos al referrer
            navigate(referrer);

        }

    }

    const resetInputErrors = (valueSetter, alertSetter) => {
        valueSetter(INPUT_FIELD_DEFAULT_CLASSNAME);
        alertSetter(null);
    }

    // Retornamos el código HTML
    return(
        <>
            {/* Contenedor de las alertas */}
            <div className="flex justify-content-center mt-8">
                {/* Alertas */}
                <Messages ref={messagesQueue} />
            </div>

            {/* Contenedor principal del login */}
            <div className="flex justify-content-center mt-1">

                {/* Tarjeta del login */}
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    {/* Cabecera */}
                    <div className="text-center mb-5">
                        <img src={process.env.REACT_APP_LOGIN_LOGO + "?a=2"} alt={"Logo " + process.env.REACT_APP_WEBSITE_TITLE} height={50} className="mb-3" />
                        <div className="text-900 text-3xl font-medium mb-3">Acceso a {process.env.REACT_APP_WEBSITE_TITLE}</div>
                    </div>

                    {/* Formulario */}
                    <div>
                        <div className="flex justify-content-center">
                            {/* Nombre de usuario */}
                            <div className="col-6">
                                <label htmlFor="username" className="block text-900 font-medium mb-2">Nombre de usuario</label>
                                <InputText 
                                    id="username" 
                                    type="text" 
                                    placeholder="Nombre de usuario" 
                                    className={loginUsernameInputClasses} 
                                    value={usernameValue} 
                                    onChange={(e) => setUsernameValue(e.target.value)} 
                                    onInput={(e) => resetInputErrors(setLoginUsernameInputClasses, setLoginUsernameInputAlert)}
                                />
                                { loginUsernameInputAlert }
                            </div>

                            {/* Contraseña */}
                            <div className="col-6">
                                <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                                <Password 
                                    id="password" 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    className={loginPasswordInputClasses}
                                    inputClassName="w-full"
                                    value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                    onInput={(e) => resetInputErrors(setLoginPasswordInputClasses, setLoginPasswordInputAlert)}
                                    feedback={false}
                                    toggleMask
                                />
                                { loginPasswordInputAlert }
                            </div>
                        </div>

                        {/* Remember me y has olvidado tu contraseña */}
                        <div className="flex align-items-center justify-content-between mb-6">
                            <div className="flex align-items-center">
                                <Checkbox id="rememberme" className="mr-2" checked={remembermeValue} onChange={(e) => setRemembermeValue(e.checked)} />
                                <label htmlFor="rememberme">Recordar usuario por dos semanas</label>
                            </div>
                            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">¿Has olvidado la contraseña?</a>
                        </div>

                        {/* Botón de inicio de sesión */}
                        <Button label="Iniciar sesión" icon="pi pi-user" className="w-full" onClick={loginUser} />
                    </div>
                </div>
            </div>
                
        </>
    );

}

export default Login;