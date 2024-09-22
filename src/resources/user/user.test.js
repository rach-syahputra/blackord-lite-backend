const supertest = require('supertest')
const userTest = require('./user.test.util')
const { app } = require('../../index')
const { putAccessToken } = require('../../utils/jwt')

const getToken = async () => {
  const userData = {
    username: 'user-test',
    email: 'user_test@example.com',
    roleId: 1
  }

  return await putAccessToken(userData)
}

describe('ADD USER', () => {
  it('should not add new user if request is invalid', async () => {
    const response = await supertest(app).post('/users').send({
      username: '',
      password: '',
      email: '',
      roleId: ''
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeDefined()
  })

  it('should add new user', async () => {
    const response = await supertest(app).post('/users').send({
      username: 'user-test',
      password: 'user-test-update',
      email: 'user_test@example.com',
      roleId: 1
    })

    expect(response.status).toBe(201)
    expect(response.body.data.username).toBe('user-test')
    expect(response.body.data.email).toBe('user_test@example.com')
    expect(response.body.data.roleId).toBe(1)

    await userTest.deleteUser()
  })
})

describe('GET USER', () => {
  beforeEach(async () => {
    await userTest.createUser()
  })

  afterEach(async () => {
    await userTest.deleteUser()
  })

  it('should be able to get user', async () => {
    const token = await getToken()
    const response = await supertest(app).get('/users/user-test')

    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('user-test')
    expect(response.body.data.email).toBe('user_test@example.com')
    expect(response.body.data.roleId).toBe(1)
  })
})

describe('UPDATE USER', () => {
  beforeEach(async () => {
    await userTest.createUser()
  })

  afterEach(async () => {
    await userTest.deleteUser()
  })

  it('should not update user if not authenticated', async () => {
    const response = await supertest(app).put('/users/user-test').send({
      email: ''
    })

    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty('error', 'You are unauthenticated')
  })

  it('should not update user if request is invalid', async () => {
    const token = await getToken()
    const response = await supertest(app)
      .put('/users/user-test')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: ''
      })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeDefined()
  })
})
