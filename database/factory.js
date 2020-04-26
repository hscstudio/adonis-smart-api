'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: '123456',
    avatar: faker.avatar({protocol: 'https'}),
  }
})

function slugify(text){
  return text.toString().toLowerCase().trim()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single _
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

// console.log(slugify('selamat-malam-guys'))

Factory.blueprint('App/Models/Post', async (faker) => {
  const title = faker.sentence({ words: 5 })
  const slug = slugify(title)

  return {
    user_id: faker.integer({ min: 1, max: 25 }),
    title: title,
    slug: slug,
    image: faker.avatar({protocol: 'https'}),
    content: faker.paragraph({ sentences: 5 }),
    tags: faker.word(),
    status: 1
  }
})

Factory.blueprint('App/Models/Comment', async (faker) => {
  return {
    post_id: faker.integer({ min: 1, max: 50 }),
    user_id: faker.integer({ min: 1, max: 25 }),
    content: faker.paragraph({ sentences: 1 })
  }
})