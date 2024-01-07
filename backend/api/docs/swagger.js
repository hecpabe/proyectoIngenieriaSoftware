const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Aplicación de Gestión de Horarios - Documentación API con Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "Esta es la API que forma parte del backend del proyecto de Aplicación de Gestión de Horarios, del Grupo 1 de Proyectos3. Aquí se documentarán las peticiones que se harán desde el frontend.",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Elisa Alonso",
          email: "elisa.alonso@live.u-tad.com"
        }
      },
      servers: [
        {
          url: "http://localhost:3001",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            clasesBase:{
              type: "object",
              properties:{
                ASIGNATURA:{
                  type: "string",
                  example: "Proyectos3"
                },
                AULA:{
                  type: "string",
                  example: "MD110"
                },
                PROFESOR:{
                  type: "string",
                  example: "Javier Alcoriza"
                },
                GRUPO:{
                  type: "string",
                  example: "INSO3C"
                },
                start:{
                  type:"string",
                  example : "2023-05-11T13:00:00+02:00"
                },
                end:{
                  type:"string",
                  example : "2023-05-11T15:00:00+02:00"
                },
                color:{
                  type:"string",
                  example: "blue"
                }
              }
            },
            clasesUsuarioWeek:{
              type: "object",
              required: ["EMAIL", "start", "end"],
              properties:{
                EMAIL:{
                  type: "string",
                  example: "elisa@live.u-tad.com"
                },
                start:{
                  type: "string",
                  example: "2023-05-10T00:00:00"
                },
                end:{
                  type: "string",
                  example: "2023-05-18T00:00:00"
                }
              }
            },
            register:{
              type: "object",
              required: ['EMAIL', 'USER_PASSWORD', 'USER_TYPE'],
              properties:{
                EMAIL:{
                  type: "string",
                  example: "elisa@live.u-tad.com"
                },
                USER_PASSWORD:{
                  type: "string",
                  example: "holiwis12345"
                },
                USER_ROLE:{
                  type: "string",
                  example: "USER"
                },
                USER_TYPE:{
                  type: "string",
                  example: "ALUMNO"
                },
                ID_GRUPO_USERS:{
                  type: "string",
                  example: "INSO3C"
                },
                ID_PROFESOR_FKK:{
                  type: "string",
                  example: "Marcos_Novalbos"
                }
              }
            },
            login:{
              type:"object",
              required:['EMAIL', 'USER_PASSWORD'],
              properties:{
                EMAIL:{
                  type: "string",
                  example: "elisa.alonso@live.u-tad.com"
                },
                USER_PASSWORD:{
                  type: "string",
                  example: "holiwis12345"
                }
              }
            },
            userConToken:{
              type: "object",
              properties:{
                RESPONSE:{
                  type:"string",
                  example:"1",
                  description:"Devuelve 1 si es alumno o profe, 2 si es admin"
                }
              }
            },
            inputFiltroUsuario:{
              type:"object",
              properties:{
                curso:{
                  type: "number",
                  example: 3
                },
                estudios:{
                  type: "string",
                  example: "INSO"
                },
                edificio:{
                  type: "string",
                  example: "MADRID"
                },
                aula:{
                  type: "number",
                  example: 114
                },
                hora_inicio:{
                  type: "string",
                  example: "13:00:00"
                },
                hora_acaba:{
                  type: "string",
                  example: "15:00:00"
                },
                aula_libre:{
                  type: "boolean",
                  example: 0
                },
                start:{
                  type: "string",
                  example: "2023-05-08T00:00:00"
                },
                end:{
                  type:"string"
                }
              }
            },
            inputCuatrimestre:{
              type: "object",
              required: ['start', 'end'],
              properties:{
                start:{
                  type: "string",
                  example: "2024-09-12"
                },
                end:{
                  type: "string",
                  example: "2025-07-07"
                }
              }
            },
            inputGrupo:{
              type: "object",
              required:['nombre', 'curso', 'letra'],
              properties:{
                nombre:{
                  type: "string",
                  example: "INSO"
                },
                curso:{
                  type: "number",
                  example: 3
                },
                letra:{
                  type: "string",
                  example: "C"
                }
              }
            },
            inputProfesor:{
              type: "object",
              required: ['MAIL', 'NOMBRE'],
              properties:{
                MAIL:{
                  type: "string",
                  example: "elisaprofe@u-tad.com"
                },
                NOMBRE:{
                  type: "string",
                  example: "Elisa_Profe"
                }
              }
            },
            inputAula:{
              type:"object",
              required:['edificio', 'numero'],
              properties:{
                edificio:{
                  type: "string",
                  example: "MADRID"
                },
                numero:{
                  type: "number",
                  example: 207
                },
                especifica:{
                  type: "boolean",
                  example: 1
                },
                description:{
                  type: "string",
                  example: "Este aula tiene 4 paredes"
                },
                recursos:{
                  type: "string",
                  example: "Posee 10 ordenadores, etc."
                }
              }
            },
            inputAsignatura:{
              type: "object",
              required: ["nombre", "numSesiones", "tipoSesiones", "start", "end"],
              properties:{
                nombre:{
                  type: "string",
                  example: "Proyectos3"
                },
                descripcion:{
                  type: "string",
                  example: "Asignatura que ..."
                },
                numSesiones:{
                  type: "number",
                  example: 32
                },
                tipoSesiones:{
                  type: "number",
                  example: 6
                },
                caracteristicas:{
                  type: "string",
                  example: "Se usa en esta asignatura ..."
                },
                start:{
                  type: "string",
                  example:"2024-01-29"
                },
                end:{
                  type: "string",
                  example:"2024-07-07"
                }
              }
            },
            outputDiasFestivos:{
              type: "array",
                     items:{
                       type: "object",
                       properties:{
                         start:{
                           type: "string",
                           example:"2023-05-15T00:00:00"
                          },
                         end:{
                           type: "string",
                           example:"2023-05-15T23:59:59"}
                       }
                     }
            }
        },
      },
    },
    apis: ["./routes/*.js"],
};
  
module.exports = swaggerJsdoc(options)