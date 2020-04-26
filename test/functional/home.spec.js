'use strict'

const { test, trait } = use('Test/Suite')('Home')

trait('Test/ApiClient')

test('ensure home page ready', async ({ assert, client }) => {
  const response = await client.get('/').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    greeting: 'Welcome to Adonis Smart API'
  })
})

test('ensure route is not match', async ({ client }) => {
  const response = await client.get('/xyz').end()
  response.assertStatus(200)
  response.assertTextHas('Not found')
})
