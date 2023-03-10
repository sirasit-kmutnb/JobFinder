import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { authenticate } from '../../services/authorize'
import AnimatedPage from "../AnimatedPage"


const LoginPage = () => {

    const navigate = useNavigate()

    const [auth, setAuth] = useState({
        username:"",
        password:""
    })

    const {username, password} = auth

    const inputValue = name=>event=> {
        setAuth({...auth, [name]:event.target.value})
    }

    const submitForm =(e)=> {
        e.preventDefault()
        axios
        .post(`${import.meta.env.VITE_APP_API}/login`, {username, password})
        .then(response=>{
            alert("successfully")
            console.log(response)
            authenticate(response, ()=>navigate('/'))
        })
        .catch(err=>{
            alert(err.response.data.err)
            // console.log(err.response.data.err)
        })
    }

    // useEffect(()=>{
        
    // })

  return (
    <AnimatedPage>
        {JSON.stringify(auth)}
        <form onSubmit={submitForm}>
                <div className="from-group">
                    <label>username</label>
                    <input type="text" className='form-control' value={username} onChange={inputValue("username")} />
                </div>
                <div className="from-group">
                    <label>password</label>
                    <input type="password" className='form-control' value={password} onChange={inputValue("password")} />
                </div>
                <br />
                <input type="submit" value="เข้าสู่ระบบ" className='btn btn-primary' />
            </form>
    </AnimatedPage>
  )
}

export default LoginPage