'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const loginRules = {
  username: 'required',
  password: 'required'
}

const signupRules = {
  username: 'required',
  email: 'required|email',
  password: 'required'
}

class AuthController {
  /**
    * @swagger
    * /api/v1/login:
    *   post:
    *     tags:
    *       - auth
    *     summary: Post user login
    *     parameters:
    *       - name: username
    *         description: username of the user
    *         in: query
    *         required: true
    *         type: string
    *       - name: password
    *         description: password of the user
    *         in: query
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: object contains user & token
    *         example:
    *           status: success
    *           message: login success
    *           data: { id, username, avatar, token }
    */

  async login ({ request, response, auth }) {
    const requestAll = request.all()
    const validation = await validateAll(requestAll, loginRules)
    if (validation.fails()) {
      return response.json({
        status: 'error',
        message: validation.messages()
      })
    } else {
      const { username, password } = requestAll
      const login = await auth.authenticator('jwt')
                              .withRefreshToken()
                              .attempt(username, password)
                          
      const user = await User.query().where({
          username: username
      }).first()
      const data = { 
        id: user.id, 
        username, 
        email: user.email,
        avatar: user.avatar,
        token: login.token 
      }
      return response.json({
        status: 'success', 
        message: 'login success', 
        data 
      })
    }
  }

  /**
    * @swagger
    * /api/v1/signup:
    *   post:
    *     tags:
    *       - auth
    *     summary: Post signup
    *     parameters:
    *       - name: username
    *         description: username of the user
    *         in: query
    *         required: true
    *         type: string
    *       - name: email
    *         description: email of the user
    *         in: query
    *         required: true
    *         type: string
    *       - name: password
    *         description: password of the user
    *         in: query
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: object contains user & token
    *         example:
    *           status: success
    *           message: signup success
    *           data: { id, username, avatar, token }
    */
  async signup ({ request, response, auth }) {
    const requestAll = request.all()
    const validation = await validateAll(requestAll, signupRules)
    if (validation.fails()) {
      return response.status(200).json({
        status: 'error',
        message: validation.messages()
      })
    } else {
      const { username, email, password } = requestAll
      try {
        const user = await User.create(requestAll)
        const login = await auth.generate(user)
        const data = { 
          id: user.id, 
          username, 
          email: user.email,
          avatar: user.avatar,
          token: login.token 
        }
        return response.json({
          status: 'success',
          message: 'signup success',
          data
        })
      } catch (error) {
        return response.status(200).json({
          status: 'error',
          message: 'There was a problem creating the user, please try again later.',
          data: error
        })
      }
    }
  }
}

module.exports = AuthController
