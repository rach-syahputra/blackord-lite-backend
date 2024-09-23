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
  it('should not add new listener if request is invalid', async () => {
    await listenerTest.createUserAsListener()

    const response = await supertest(app).post('/listeners').send({
      username: 2,
      image: true
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeDefined()

    await listenerTest.deleteListener()
  })

  it('should not add new listener if username does not exist', async () => {
    await listenerTest.createUserAsListener()

    const response = await supertest(app).post('/listeners').send({
      username: 'user-test-example',
      image: 'listener-image'
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeDefined()

    await listenerTest.deleteListener()
  })

  it('should add new listener', async () => {
    await listenerTest.createUserAsListener()

    const response = await supertest(app)
      .post('/listeners')
      .field({
        username: 'listener-test'
      })
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(201)

    await listenerTest.deleteListener()
  })

  it('should not add new listener if listener already exists', async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createListener()

    const response = await supertest(app)
      .post('/listeners')
      .field({
        username: 'listener-test'
      })
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(409)

    await listenerTest.deleteListener()
  })
})

describe('GET LISTENER', () => {
  it('should not be able to get listener if listener is not registered', async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createListener()

    const response = await supertest(app).get('/listeners/user-test-example')

    expect(response.status).toBe(404)
    expect(response.body.error).toBeDefined()

    await listenerTest.deleteListener()
  })

  it('should be able to get listener', async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createListener()

    const response = await supertest(app).get('/listeners/listener-test')

    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('listener-test')
    expect(response.body.data.image).toBe('user-image')

    await listenerTest.deleteListener()
  })
})

describe('UPDATE LISTENER', () => {
  it('should not update listener if not authenticated', async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createListener()

    const response = await supertest(app).put('/listeners/listener-test')

    expect(response.status).toBe(403)
    expect(response.body.error).toBeDefined()

    await listenerTest.deleteListener()
  })

  it('should update the listener', async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createListener()

    const token = await getToken()
    const response = await supertest(app)
      .put('/listeners/listener-test')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(200)
    expect(response.body.data.image).toBeDefined()

    await listenerTest.deleteListener()
  })
})

describe('GET FAVORITE ARTISTS', () => {
  it('should get empty favorite artists', async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createListener()

    const response = await supertest(app).get(
      '/listeners/listener-test/favorite-artists'
    )

    expect(response.status).toBe(200)
    expect(response.body.data).toStrictEqual([])

    await listenerTest.deleteListener()
  })

  it('should be able to get favorite artists', async () => {
    await listenerTest.createUserAsListener()
    await listenerTest.createUserAsArtist()
    await listenerTest.createListener()
    await listenerTest.createArtist()
    // await listenerTest.createListenerArtist()

    // const response = await supertest(app).get(
    //   '/listeners/listener-test/favorite-artists'
    // )

    // expect(response.status).toBe(200)
    // expect(response.body.data).toStrictEqual([
    //   { artistUsername: 'artist-test' }
    // ])

    await listenerTest.deleteListener()
    await listenerTest.deleteArtist()
  })
})
