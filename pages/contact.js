import { useState, useEffect } from 'react'

export default () => {
  const [text, setText] = useState('')
  const [input, setInput] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const fetchText = async () => {
      const res = await fetch('/api/hello')
      const { text } = await res.json()
      setText(text)
    }
    fetchText()
  }, [])

  const sendName = async text => {
    const res = await fetch('/api/contact', { method: 'POST', body: text })
    const { name } = await res.json()
    setName(name)
  }

  return (
    <div>
      <h1>{text}</h1>
      <h2>Name: {name}</h2>
      <input onChange={e => setInput(e.target.value)} type="text" />
      <button onClick={() => sendName(input)}>Submit</button>
    </div>
  )
}