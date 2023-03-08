import { Link } from "react-router-dom"
import axios from 'axios'

import AnimatedPage from "../AnimatedPage"
import { useEffect, useState } from "react"

const Jobs = () => {

    const [posts, setPosts] = useState([])

    const fetchData = () => {
        axios
        .get(`${import.meta.env.VITE_APP_API}/posts`)
        .then(response=>{
            console.log(response)
            setPosts(response.data)
        })
        .catch(err=>alert(err))
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <AnimatedPage>
        <div className="container-sm">

            {posts.map((post, index)=>(
                <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
                    <div className="col pt-3 pb-2">
                        <Link to="#">
                            <h2>{post.title}</h2>
                        </Link>
                        <div className="pt-3">{post.details.substring(0, 300)}</div>
                        <p className='text-muted'>ผู้โพสต์: {post.author_id} , เผยแพร่ : {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            ))

            }
        </div>
    </AnimatedPage>
  )
}

export default Jobs