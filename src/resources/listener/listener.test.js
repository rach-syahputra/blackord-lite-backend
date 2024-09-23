const supertest = require('supertest')
const listenerTest = require('./listener.test.util')
const app = require('../../index')
const { putAccessToken } = require('../../utils/jwt')

const getToken = async () => {
  const listenerData = {
    username: 'listener-test',
    image: 'listener-image'
  }

  return await putAccessToken(listenerData)
}

describe('ADD LISTENER', () => {
  beforeEach(async () => {
    await listenerTest.createUserAsListener()
  })

  afterEach(async () => {
    await listenerTest.deleteListener()
  })

  it('should not add new listener if request is invalid', async () => {
    const response = await supertest(app).post('/listeners').send({
      username: '',
      image: true
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeDefined()
  })

  it('should not add new listener if username does not exist', async () => {
    const response = await supertest(app).post('/listeners').send({
      username: 'user-test-example',
      image: 'listener-image'
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeDefined()
  })

  it('should add new listener', async () => {
    const response = await supertest(app)
      .post('/listeners')
      .field({
        username: 'listener-test'
      })
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(201)
  })

  it('should not add new listener if listener already exists', async () => {
    await listenerTest.createListener()

    const response = await supertest(app)
      .post('/listeners')
      .field({
        username: 'listener-test'
      })
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(409)
  })
})

describe('GET LISTENER', () => {
  beforeEach(async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createListener()
  })

  afterEach(async () => {
    await listenerTest.deleteListener()
  })

  it('should not be able to get listener if listener is not registered', async () => {
    const response = await supertest(app).get('/listeners/user-test-example')

    expect(response.status).toBe(404)
    expect(response.body.error).toBeDefined()
  })

  it('should be able to get listener', async () => {
    const response = await supertest(app).get('/listeners/listener-test')

    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('listener-test')
    expect(response.body.data.image).toBe('user-image')
  })
})

describe('UPDATE LISTENER', () => {
  beforeEach(async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createListener()
  })

  afterEach(async () => {
    await listenerTest.deleteListener()
  })

  it('should not update listener if not authenticated', async () => {
    const response = await supertest(app).put('/listeners/listener-test')

    expect(response.status).toBe(403)
    expect(response.body.error).toBeDefined()
  })

  it('should update the listener', async () => {
    const token = await getToken()
    const response = await supertest(app)
      .put('/listeners/listener-test')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(200)
    expect(response.body.data.image).toBeDefined()
  })
})

describe('GET FAVORITE ARTISTS', () => {
  beforeEach(async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createUserAsArtist()
    await listenerTest.createListener()
    await listenerTest.createArtist()
  })

  afterEach(async () => {
    await listenerTest.deleteListener()
    await listenerTest.deleteArtist()
  })

  it('should get empty favorite artists', async () => {
    const response = await supertest(app).get(
      '/listeners/listener-test/favorite-artists'
    )

    expect(response.status).toBe(200)
    expect(response.body.data).toStrictEqual([])
  })

  it('should be able to get favorite artists', async () => {
    await listenerTest.createListenerArtist()

    const response = await supertest(app).get(
      '/listeners/listener-test/favorite-artists'
    )

    expect(response.status).toBe(200)
    expect(response.body.data).toStrictEqual([
      { artistUsername: 'artist-test' }
    ])
  })
})
