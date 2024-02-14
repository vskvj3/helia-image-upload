/* eslint-disable no-console */

import { useState, useCallback } from 'react'
import { useHelia } from '@/hooks/useHelia'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const useCommitFile = () => {
    
  const { helia, fs, error, starting } = useHelia()
  const [cid, setCid] = useState(null)
  const [cidString, setCidString] = useState('')
  const [committedFile, setCommittedFile] = useState('')

  const commitBase64File = useCallback(async (file) => {
    if (!error && !starting) {
      try {
        const cid = await fs.addBytes(
          encoder.encode(file),
          helia.blockstore
        )
        setCid(cid)
        setCidString(cid.toString())
        console.log('Added file:', cid.toString())
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log('please wait for helia to start')
    }
  }, [error, starting, helia, fs])

  const fetchBase64File = useCallback(async (file_cid) => {
    let file = ''
    if (!error && !starting) {
      try {
        console.log(file_cid)
        for await (const chunk of fs.cat(file_cid)) {
          file += decoder.decode(chunk, {
            stream: true
          })
        }
        setCommittedFile(file)
        console.log('fetched file from cid', file)
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log('please wait for helia to start')
    }
  }, [error, starting, cid, helia, fs])
  
  return { cidString, committedFile, commitBase64File, fetchBase64File }
}
