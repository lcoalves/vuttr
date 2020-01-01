/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChangeColumnDescriptionToTextSchema extends Schema {
  up() {
    this.table('tools', table => {
      // alter table
      table.text('description').alter();
    });
  }

  down() {
    this.table('tools', table => {
      // reverse alternations
      table.text('description');
    });
  }
}

module.exports = ChangeColumnDescriptionToTextSchema;
