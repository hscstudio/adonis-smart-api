'use strict'

const { test, trait } = use('Test/Suite')('Post')

trait('Test/ApiClient')
trait('Auth/Client')

test('access posts as guest', async ({ assert, client }) => {
  const response = await client.get('/api/v1/posts').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'error' 
  })
  response.assertTextHas('E_INVALID_JWT_TOKEN')
})

test('access post as authenticated user', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const response = await client.get('/api/v1/posts?page=1').loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success' 
  })
  response.assertTextHas('get list post successfully')
})

test('access post as authenticated user', async ({ assert, client }) => {
  const User = use('App/Models/User')
  const user = await User.find(1)
  const Post = use('App/Models/Post')
  const post = await Post.find(1)
  const response = await client.get('/api/v1/post/'+post.slug).loginVia(user, 'jwt').end()
  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success' 
  })
  response.assertTextHas('get post successfully')
})