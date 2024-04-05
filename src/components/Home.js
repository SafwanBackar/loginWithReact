import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
  return (
    <div>
        Home
        <button onClick={()=> navigate('/blog')}>Blog</button>
    </div>
  )
}

export default Home