'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('post_id').unsigned().notNullable().references('id').inTable('posts')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.string('content', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
