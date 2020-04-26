'use strict'

const { test, trait } = use('Test/Suite')('Auth')

trait('Test/ApiClient')
trait('Auth/Client')

test('login user without data', async ({ assert, client }) => {
  const response = await client.post('/api/v1/login').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('required validation failed')
})

test('login user with wrong data', async ({ assert, client }) => {
  const response = await client.post('/api/v1/login').send({ username: 'abcde', password: '123456' }).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('E_USER_NOT_FOUND')
})

test('login user with correct username', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const response = await client.post('/api/v1/login').send({ username: user.username, password: '12345' }).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('E_PASSWORD_MISMATCH')
})

test('login user with correct data', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const response = await client.post('/api/v1/login').send({ username: user.username, password: '123456' }).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success' 
  })
  response.assertTextHas('login success')
})

test('signup user with wrong data', async ({ assert, client }) => {
  const response = await client.post('/api/v1/signup').send({ 
    username: 'user_test', email: 'user_test@abc.com'
  }).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('required validation failed')
})

test('signup user with correct data', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.query().where('username', '=', 'user_test').first()
  if (user) await user.delete()
  const response = await client.post('/api/v1/signup').send({ 
    username: 'user_test', email: 'user_test@abc.com', password: '123456'
  }).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success' 
  })
  response.assertTextHas('signup success')
})

test('signup user with duplicate data', async ({ assert, client }) => {
  const response = await client.post('/api/v1/signup').send({ 
    username: 'user_test', email: 'user_test@abc.com', password: '123456'
  }).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('There was a problem creating the user')
})
