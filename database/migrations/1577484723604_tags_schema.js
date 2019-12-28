'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagsSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments()
      table
        .integer("tool_id")
        .unsigned()
        .references("id")
        .inTable("tools")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = TagsSchema
