const getCloudinaryPublicId = (imageUrl) => {
  const folderName = imageUrl.split('/').slice(-2, -1)
  const fileName = imageUrl.split('/').slice(-1)[0].split('.')[0]
  const publicId = folderName.concat([fileName]).join('/')

  return publicId
}

module.exports = { getCloudinaryPublicId }
