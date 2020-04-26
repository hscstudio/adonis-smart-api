'use strict'

const Post = use('App/Models/Post')

function slugify(text){
  return text.toString().toLowerCase().trim()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single _
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

class PostController {
  /**
    * @swagger
    * /api/v1/posts:
    *   get:
    *     tags:
    *       - post
    *     summary: Get post
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - name: Authorization
    *         description: Bearer [space] token
    *         in: header
    *         required: true
    *         type: string
    *       - name: page
    *         description: Number of the page
    *         in: query
    *         required: false
    *         type: string
    *     responses:
    *       200:
    *         description: success getting post
    *         example:
    *           status: success
    *           message: get list post successfully
    *           data: [{ object post 1}, { object post 2}, { object post n}]
    *       401:
    *         description: error getting data
    *         example:
    *           status: error
    *           message: 'E_INVALID_JWT_TOKEN: invalid token'
    */
  async index ({request, response}) {
    const params = request.get()
    const page = (params.page && params.page>0) ? params.page : 1
    const perPage = 10
    const posts = await Post.query().setHidden(['content']).with('user').withCount('comments').paginate(page, perPage)
    return response.send({
      status: "success",
      message: "get list post successfully",
      data: posts
    })
  }

  /**
    * @swagger
    * /api/v1/post/{slug}:
    *   get:
    *     tags:
    *       - post
    *     summary: Get single post
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - name: Authorization
    *         description: Bearer [space] token
    *         in: header
    *         required: true
    *         type: string
    *       - name: slug
    *         description: Slug of the post
    *         in: path
    *         required: false
    *         type: string
    *     responses:
    *       200:
    *         description: success getting post
    *         example:
    *           status: success
    *           message: get post successfully
    *           data: { object post}
    *       401:
    *         description: error getting data
    *         example:
    *           status: error
    *           message: 'E_INVALID_JWT_TOKEN: invalid token'
    */

  async view ({params, response}) {
    const slug = slugify(params.slug)
    const post = await Post.query().where({ slug }).with('user').with('comments').first()
    return response.send({
      status: "success",
      message: "get post successfully",
      data: post
    })
  }

}

module.exports = PostController
