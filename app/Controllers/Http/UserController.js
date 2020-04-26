'use strict'

// adonis make:controller User --type http
const { validateAll } = use('Validator')
const updateRules = {
  username: 'required',
  email: 'required|email',
}

class UserController {
  /**
    * @swagger
    * /api/v1/profile:
    *   get:
    *     tags:
    *       - user
    *     summary: Get authenticated user 
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - name: Authorization
    *         description: Bearer [space] token
    *         in: header
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: success getting profile
    *         example:
    *           status: success
    *           message: get profile success
    *           data: { id, username, avatar, token }
    *       401:
    *         description: error getting data
    *         example:
    *           status: error
    *           message: 'E_INVALID_JWT_TOKEN: invalid token'
    */

  async profile({ response, auth }) {
    return response.send({
      status: 'success',
      message: 'get profile success',
      data: auth.current.user
    })
  }

  /**
    * @swagger
    * /api/v1/profile:
    *   post:
    *     tags:
    *       - user
    *     summary: Post update profile
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - name: Authorization
    *         description: Bearer [space] token
    *         in: header
    *         required: true
    *         type: string
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
    *     responses:
    *       200:
    *         description: object contains user & token
    *         example:
    *           status: success
    *           message: Profile updated!
    *           data: { id, username, avatar, token }
    *       401:
    *         description: error getting data
    *         example:
    *           status: error
    *           message: 'E_INVALID_JWT_TOKEN: invalid token'
    */
  
  async update ({ request, auth, response }) {
    const validation = await validateAll(request.all(), updateRules)
    if (validation.fails()) {
      return response.status(200).json({
        status: 'error',
        message: validation.messages()
      })
    } else {
      try {
          const user = auth.current.user
          user.username = request.input('username')
          user.email = request.input('email')
          await user.save()
          return response.json({
              status: 'success',
              message: 'Profile updated!',
              data: user
          })
      } catch (error) {
          return response.status(200).json({
              status: 'error',
              message: 'There was a problem updating profile, please try again later.'
          })
      }
    }
  }
}

module.exports = UserController
