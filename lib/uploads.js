import fs from 'fs'
import path from 'path'

const imagesDirectory = 'public/uploads'

export function getUploads() {
  const fileNames = fs.readdirSync(imagesDirectory)
  const uploads = fileNames.map(fileName => {
    return path.join('uploads', fileName)
  })
  return uploads
}