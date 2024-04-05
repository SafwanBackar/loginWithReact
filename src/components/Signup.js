import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export default function Signup(props) {
    const [authMode, setAuthMode] = useState("signin")
    const [wrongCred, setWrongCred] = useState(false)
    const navigate = useNavigate()
    const {getValues, register, handleSubmit, formState: { errors }, reset} = useForm()
    const handleAuthChange = ()=>{
        setAuthMode(authMode === "signin" ? "signup" : "signin");
        reset();
    }
    const onSubmitRegister = async (data) => {
        const email = data.email
        const password = data.password
        try {
            axios({
                method: "POST",
                url: "http://localhost:5000/auth/register",
                data: { email, password }
            }).then(() =>{
                setAuthMode('signin')
                reset()
            })
        } catch (error) {
            console.error(error)
        }finally{
            if (wrongCred) setWrongCred(false)
        }
    };

    const handleLogin = async (data) => {
        const loginEmail = data.loginEmail
        const loginPassword = data.loginPassword
        try {
            axios({
                method: "POST",
                url: "http://localhost:5000/auth/login",
                data: { loginEmail, loginPassword }
            }).then((res)=>{
                if (res.status === 'success'){
                    localStorage.setItem("jtk", 'Bearer ' + res.data.accessToken);
                    localStorage.setItem("refjtk", 'Bearer ' + res.data.refreshToken);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
                    navigate('/home')
                }else{
                    setWrongCred(true)
                }
            })  
        } catch (error) {
            console.error(error)
        }   
    }

    if (authMode === "signin") {
    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit(handleLogin)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <span className="link-primary" onClick={handleAuthChange}>
                            Sign Up
                        </span>
                    </div>
                    {wrongCred && <div className="text-center invalid-details">Invalid Email or Password !</div>}
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input type="text" name="loginEmail" className="form-control mt-1" placeholder="Enter email"
                            {...register("loginEmail", { required: 'Email is required!'})} 
                        />
                        {errors.loginEmail && <p className="errorMsg">{errors.loginEmail.message}</p>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input type="password" name="loginPassword" className="form-control mt-1" placeholder="Enter password"
                                {...register("loginPassword", { required: 'Password is required!'})} />
                        {errors.loginPassword && <p className="errorMsg">{errors.loginPassword.message}</p>}
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
    }

    return (
    <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit(onSubmitRegister)}>
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign Up</h3>
                <div className="text-center">
                    Already registered?{" "}
                    <span className="link-primary" onClick={handleAuthChange}>
                        Sign In
                    </span>
                </div>
                <div className="form-group mt-3">
                    <label>Email address</label>
                    <input type="text" className="form-control mt-1" placeholder="Email Address" autoComplete="new-password"
                        {...register("email", 
                        {
                            required: 'Email is required!',
                            // this validate should be in backend??
                            validate: async (email)=>{
                                const response = await axios.get('http://localhost:3005/users')
                                let user = response.data.find(user=>{ return user.email === email })
                                if (user) return 'Email already exists!'
                            }
                        })} 
                    />
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input type="password" className="form-control mt-1" placeholder="Password"
                        {...register("password", 
                        {
                            required: 'Password is required!',
                            minLength: {value: 6, message: 'Password should be atleast 6 characters.'
                        }
                        })}
                    />
                    {errors.password && <p className="errorMsg">{errors.password.message}</p>}
                </div>
                <div className="form-group mt-3">
                    <label>Re-enter Password</label>
                    <input type="password" className="form-control mt-1" placeholder="Re-enter Password"
                        {...register("repassword", 
                        {
                            required: 'Password is required!', 
                            validate: (val) =>{
                            const { password } = getValues();
                            return password === val || "Passwords should match!";
                        }
                        })}
                    />
                    {errors.repassword && <p className="errorMsg">{errors.repassword.message}</p>}
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
    )
}