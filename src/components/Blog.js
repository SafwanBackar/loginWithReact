import React, { useEffect } from 'react'
import authCheck from '../middleware/authCheck'
// import axios from 'axios'

function Blog() {

  useEffect(()=>{
    const doCheck = async () => {
      const tokenStatus = await authCheck()
    }
    doCheck()
  })

  return (
    <div>Blog</div>
  )
}

export default Blog