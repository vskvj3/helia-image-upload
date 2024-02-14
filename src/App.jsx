import { React, useState } from 'react'
import './App.css'
import { useCommitFile } from '@/hooks/useCommitFile'
import { useHelia } from '@/hooks/useHelia'

function App () {
  const [file, setFile] = useState('')
  const { error, starting } = useHelia()
  const {fetchCID, setFetchCID} = useState('')
  const [text, setText] = useState('')
  const {
    cidString,
    commitBase64File,
    fetchBase64File,
    committedFile
  } = useCommitFile()

  function handleUpload() {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
      commitBase64File(reader.result)
    }
    reader.onerror = (error) => {
     console.log('Error: ', error) 
    }
  }

  return (
    <div className="App">
      <div
        id="heliaStatus"
        style={{
          border: `4px solid ${
            error
? 'red'
            : starting ? 'yellow' : 'green'
          }`,
          paddingBottom: '4px'
        }}
      >Helia Status: <br /> {starting ? 'starting' : 'started'} <br /> {error? `error: ${error}` :  'working'}</div>
      <input
        id="file"
        accept='image/*'
        onChange={(event) => setFile(event.target.files[0])}
        type="file" />
      <button
        id="commitFileButton"
        onClick={handleUpload}
      >Add File To Node</button>
      <div
        id="cidOutput"
      >textCid: {cidString}</div>
      <br />
      <input
        id="textInput"
        value={text}
        onChange={(event) => setText(event.target.value)}
        type="text" />
      <>
        <button
          id="fetchCommittedFileButton"
          onClick={() => fetchBase64File(text)}
        >Fetch Data from CID</button>
          <div
            id="committedFileOutput"
          >uploadedImage:</div><br />
          <img src={committedFile}/>:
        </>
      

    </div>
  )
}

export default App
