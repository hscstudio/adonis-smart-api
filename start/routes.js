'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Database = use('Database')
const Logger = use('Logger')


// http://localhost:4000/
Route.get('/', () => {
  return { greeting: 'Welcome to Adonis Smart API' }
})

Route.group(() => {
  // GET/POST http://localhost:4000/dev/
  Route.get('/', () => 'Hello Adonis')
  Route.post('/', () => 'Hello Adonis')

  // GET http://localhost:4000/dev/log
  Route.get('/log', ({request}) => {
    Logger.info('request url is %s', request.url())
    return 'Check console log'
  })

  // GET/POST/PUT/DELETE http://localhost:4000/dev/method
  Route.route('/method', ({request}) => {
    const method = request.method()
    return `Hello with method: ${method}`
  }, ['GET', 'POST', 'PUT', 'DELETE'])

  // GET http://localhost:4000/dev/param/5
  Route.get('param/:id', ({ params, request }) => {
    // const url = request.url()
    const url = request.originalUrl()
    return `Param id: ${params.id} ~ ${url}`
  })

  // GET http://localhost:4000/dev/order (or) order/tea
  Route.get('order/:drink?', ({ params }) => {
    // use Coffee as fallback when drink is not defined
    const drink = params.drink || 'Coffee'
    return `One ${drink}, coming right up!`
  })

  // GET http://localhost:4000/dev/query-params?name=alex
  Route.get('query-params', ({ request }) => {
    return request.get()
  })

  // POST http://localhost:4000/dev/query-params    {name: 'alex'}
  Route.post('query-params', ({ request }) => {
    return request.post()
  })

  // GET http://localhost:4000/dev/db
  Route.get('/db', async () => {
    return await Database.table('users').select('*')
  })

  // GET http://localhost:4000/dev/abc
  Route.get('/abc', 'DevController.abc')

  // POST http://localhost:4000/dev/xyz  {email, password}
  Route.post('/xyz', 'DevController.xyz')

}).prefix('dev') // http://localhost:4000/dev

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/signup', 'AuthController.signup')
}).prefix('api/v1')

Route.group(() => {
  Route.get('/profile', 'UserController.profile')
  Route.post('/profile', 'UserController.update')

  Route.get('/posts', 'PostController.index')
  Route.get('/post/:slug', 'PostController.view')

}).prefix('api/v1').middleware(['auth:jwt'])

// except above
Route.any('*', () => 'Not found')

// adonis route:list