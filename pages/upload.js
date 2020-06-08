import { useState } from "react"
import axios from "axios"
import { getUploads } from "lib/uploads"
import Head from "next/head"

export default ({ uploads }) => {
  const [file, setFile] = useState(null)
  const [newFiles, setNewFiles] = useState(uploads)

  const onFormSubmit = (e) => {
    e.preventDefault()
    fileUpload(file).then(res => {
      console.log(res.data)
      setNewFiles([...newFiles, res.data.filepath])
    })
  }

  const fileUpload = file => {
    const url = '/api/upload'
    const formData = new FormData()
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post(url, formData, config)
  }

  return (
    <div className="container">
      <Head>
        <title>File Uploader in Nextjs</title>
      </Head>
      <h1>Upload Form</h1>
      <form onSubmit={onFormSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <div className="uploads">
        {newFiles.map((upload, index) => <img src={upload} alt="" key={index} />)}
      </div>

      <style jsx>{`
        .container {
          width: 800px;
          margin: 0 auto;
          padding-top: 100px;
        }
        .uploads {
          display: flex;
          flex-wrap: wrap;
        }
        .uploads img {
          width: 200px;
          object-fit: cover;
          object-position: center;
          margin: 10px;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  const uploads = await getUploads()
  return {
    props: {
      uploads
    }
  }
}