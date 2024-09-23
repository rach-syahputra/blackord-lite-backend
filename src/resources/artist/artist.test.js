const supertest = require('supertest')
const artistTest = require('./artist.test.util')
const app = require('../../index')
const { putAccessToken } = require('../../utils/jwt')

const getArtistToken = async () => {
  const artistData = {
    username: 'artist-test',
    image: 'artist-image'
  }

  return await putAccessToken(artistData)
}

const getListenerToken = async () => {
  const listenerData = {
    username: 'listener-test',
    image: 'listener-image'
  }

  return await putAccessToken(listenerData)
}

describe('ADD ARTIST', () => {
  it('should not add new artist if request is invalid', async () => {
    await artistTest.createUserAsArtist()

    const response = await supertest(app).post('/artists').send({
      username: '',
      artistName: '',
      image: true,
      bio: 2
    })

    expect(response.status).toBe(400)
    expect(response.body.error).toBeDefined()

    await artistTest.deleteArtist()
  })

  it('should not add new artist if username is not registered', async () => {
    await artistTest.createUserAsArtist()

    const response = await supertest(app)
      .post('/artists')
      .field({
        username: 'artist-test-example',
        artistName: 'artist-test',
        bio: 'artist test bio'
      })
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Username is not registered')

    await artistTest.deleteArtist()
  })

  it('should add new artist', async () => {
    await artistTest.createUserAsArtist()

    const response = await supertest(app)
      .post('/artists')
      .field({
        username: 'artist-test',
        artistName: 'artist-test',
        bio: 'artist test bio'
      })
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(201)
    expect(response.body.data.username).toBe('artist-test')
    expect(response.body.data.artistName).toBe('artist-test')
    expect(response.body.data.bio).toBe('artist test bio')
    expect(response.body.data.image).toBeDefined()

    const artist = await artistTest.getArtistByUsername()

    expect(artist.username).toBe('artist-test')
    expect(artist.image).toBeDefined()
    await artistTest.deleteImage(artist.image)
    await artistTest.deleteArtist()
  })

  it('should not add new artist if artist already exists', async () => {
    await artistTest.createUserAsArtist()
    await artistTest.createArtist()

    const response = await supertest(app)
      .post('/artists')
      .field({
        username: 'artist-test',
        artistName: 'artist-test',
        bio: 'artist test bio'
      })
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(409)

    await artistTest.deleteArtist()
  })
})

describe('GET ARTIST', () => {
  it('should not be able to get artist if artist is not registered', async () => {
    await artistTest.createUserAsArtist()
    await artistTest.createArtist()

    const response = await supertest(app).get('/artists/artist-test-example')

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Artist not found')

    await artistTest.deleteArtist()
  })

  it('should be able to get artist', async () => {
    await artistTest.createUserAsArtist()
    await artistTest.createArtist()

    const response = await supertest(app).get('/artists/artist-test')

    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('artist-test')
    expect(response.body.data.image).toBe('user-image')

    await artistTest.deleteArtist()
  })
})

describe('UPDATE ARTIST', () => {
  it('should not update artist if not authenticated', async () => {
    await artistTest.createUserAsArtist()
    await artistTest.createArtist()

    const response = await supertest(app).put('/artists/artist-test').field({
      bio: 'update bio'
    })

    expect(response.status).toBe(403)
    expect(response.body.error).toBe('You are unauthenticated')

    await artistTest.deleteArtist()
  })

  it('should update artist', async () => {
    await artistTest.createUserAsArtist()
    await artistTest.createArtist()

    const token = await getArtistToken()
    const response = await supertest(app)
      .put('/artists/artist-test')
      .set('Authorization', `Bearer ${token}`)
      .field({
        bio: 'update bio'
      })
      .attach('image', 'public/images/image-test.png')

    expect(response.status).toBe(200)
    expect(response.body.data.bio).toBe('update bio')
    expect(response.body.data.image).toBeDefined()

    const artist = await artistTest.getArtistByUsername()

    expect(artist.username).toBe('artist-test')
    expect(artist.image).toBeDefined()
    await artistTest.deleteImage(artist.image)

    await artistTest.deleteArtist()
  })
})
