'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');
const Tool = use('App/Models/Tool');

/**
 * Resourceful controller for interacting with tools
 */
class ToolController {
  /**
   * Show a list of all tools.
   * GET tools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const { page, tag } = request.get();

    const tool = await Tool.query()
      .with('tags')
      .whereHas('tags', builder => {
        if (tag) {
          builder.whereRaw("LOWER(name) like '%' || LOWER(?) || '%'", tag);
        }
      })
      .orderBy('id')
      .paginate(page, 10);

    return tool;
  }

  /**
   * Create/save a new tool.
   * POST tools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { title, link, description, tags } = request.only([
      'title',
      'link',
      'description',
      'tags',
    ]);

    const trx = await Database.beginTransaction();

    const tool = await Tool.create(
      {
        title,
        link,
        description,
      },
      trx
    );

    await tool.tags().createMany(
      tags.map(tag => {
        return {
          name: tag,
        };
      }),
      trx
    );

    await trx.commit();

    await tool.load('tags');

    return response.status(201).send(tool);
  }

  /**
   * Delete a tool with id.
   * DELETE tools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
    const tool = await Tool.findOrFail(params.id);

    await tool.delete();
    } catch (err) {
      return response.status(400).send({
        title: 'Falha!',
        message: 'Houve um erro durante a remoção.'
      })
    }
  }
}

module.exports = ToolController;
