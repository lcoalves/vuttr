/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/**
 *  @swagger
 *  definitions:
 *    Tool:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        title:
 *          type: string
 *        link:
 *          type: string
 *        description:
 *          type: string
 *        tags:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Tag'
 *      required:
 *        - title
 *        - link
 *        - description
 *        - tags
 */
class Tool extends Model {
  tags() {
    return this.hasMany('App/Models/Tag').orderBy('id');
  }
}

module.exports = Tool;
