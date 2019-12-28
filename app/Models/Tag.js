'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  tool() {
    return this.belongsTo("App/Models/Tool");
  }
}

module.exports = Tag
