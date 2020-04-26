'use strict'

const { test, trait } = use('Test/Suite')('Profile')

trait('Test/ApiClient')
trait('Auth/Client')

test('access profile as guest', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const response = await client.get('/api/v1/profile').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('E_INVALID_JWT_TOKEN')
})

test('access profile as authenticated user', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const response = await client.get('/api/v1/profile').loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success' 
  })
  response.assertTextHas('get profile success')
})

test('update profile as authenticated user', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const response = await client.post('/api/v1/profile').send({
    username: user.username,
    email: user.email
  }).loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success' 
  })
  response.assertTextHas('Profile updated!')
})

test('update profile with wrong data as authenticated user', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const response = await client.post('/api/v1/profile').send({
    username: user.username,
  }).loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('required validation failed')
})

test('update profile with duplicate data as authenticated user', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const user2 = await User.find(2)
  const response = await client.post('/api/v1/profile').send({
    username: user2.username,
    email: user2.email,
  }).loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('There was a problem updating profile')
})