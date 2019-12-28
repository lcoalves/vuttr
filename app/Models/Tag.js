/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/**
 *  @swagger
 *  definitions:
 *    Tag:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        tool_id:
 *          type: integer
 *        name:
 *          type: string
 *      required:
 *        - tool_id
 *        - name
 */
class Tag extends Model {
  tool() {
    return this.belongsTo('App/Models/Tool');
  }
}

module.exports = Tag;
