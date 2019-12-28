class SessionController {
  /**
   * Create/save a new tool.
   * POST tools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password']);

    const token = await auth.attempt(email, password);

    return response.status(201).send(token);
  }
}

module.exports = SessionController;
