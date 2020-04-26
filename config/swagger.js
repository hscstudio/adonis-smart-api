'use strict'

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Spesification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */

  enable: true,
  specUrl: '/swagger.json',

  options: {
    swaggerDefinition: {
      swagger: "2.0",
      info: {
        description: "Documentation of adonis smart api.",
        version: "1.0.0",
        title: "Adonis Smart API - Built with love 💘 by Adonis Swagger",
        /*
        termsOfService: "http://swagger.io/terms/",
        contact: {
          email: "apiteam@swagger.io"
        },
        license: {
          name: "Apache 2.0",
          url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
        */
      },
      "host": "127.0.0.1:4000",
      "basePath": "/",
      "tags": [
        {
          "name": "auth",
          "description": "Everything about authentication",
          "externalDocs": {
            "description": "Find out more",
            "url": "http://swagger.io"
          }
        },
        {
          "name": "user",
          "description": "Everything about user"
        },
        {
          "name": "post",
          "description": "Everything about post"
        },
      ],
      "schemes": [
        "http",
        "https"
      ],
      "components": {
        "securitySchemes": {
          "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          }
        }
      },
      "securityDefinitions": {
        "Bearer": {
          "type": "apiKey",
          "name": "Authorization",
          "in": "header"
        }
      }
    },

    // Path to the API docs
    // Sample usage
    // apis: [
    //    'docs/**/*.yml',    // load recursive all .yml file in docs directory
    //    'docs/**/*.js',     // load recursive all .js file in docs directory
    // ]
    apis: [
      'app/**/*.js',
      'start/routes.js'
    ]
  }
}