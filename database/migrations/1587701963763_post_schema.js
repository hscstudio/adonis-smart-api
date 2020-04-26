'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique()
      table.string('image', 255).nullable()
      table.text('content').notNullable()
      table.string('tags', 255).nullable()
      table.boolean('status').defaultTo(true).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
