'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  static get computed () {
    return ['excerpt']
  }

  getExcerpt ({content}) {

    return (content && content.length>0) ? content.substring(0, 100) : ''
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }
}

module.exports = Post
