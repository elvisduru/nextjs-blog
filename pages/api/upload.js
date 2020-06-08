import formidable from "formidable"
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async (req, res) => {
  const form = new formidable.IncomingForm()
  const uploadDir = 'public/uploads'
  form.keepExtensions = true
  let name;
  form.parse(req)
    .on('fileBegin', (filename, file) => {
      name = file.name
      file.path = path.join(uploadDir, name)
    })
    .on('end', () => {
      res.status(200).json({ filepath: 'uploads/' + name })
    })
}