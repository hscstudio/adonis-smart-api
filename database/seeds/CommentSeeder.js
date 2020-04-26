'use strict'

/*
|--------------------------------------------------------------------------
| CommentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CommentSeeder {
  async run () {
    await Factory
      .model('App/Models/Comment')
      .createMany(100)
  }
}

module.exports = CommentSeeder
