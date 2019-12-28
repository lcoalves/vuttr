const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');

test('it should return JWT token when session created', async ({
  assert,
  client,
}) => {
  const payload = {
    email: 'admin_test@vuttr.com',
    password: '123456',
  };

  await Factory.model('App/Models/User').create(payload);

  const response = await client
    .post('/sessions')
    .send(payload)
    .end();

  response.assertStatus(201);

  assert.exists(response.body.token);
});
