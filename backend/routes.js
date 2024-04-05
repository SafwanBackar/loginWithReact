const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
const { logDOM } = require('@testing-library/react');
require('dotenv').config()

router.post('/register', async (req,res)=>{
    const { email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const body = {email, password: hashedPassword}
    try {
        axios.post('http://localhost:3005/users', body ).then((data)=>{
            res.status(200).json({id: data.id, email: data.email})
        }) 
    } catch (error) {
        res.status(400).json(error)
    }
    // const username = req.body.username
    // const user = { name: username }
    // const accessToken = generateAccessToken(user)
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    // refreshTokens.push(refreshToken)
    // res.json({accessToken: accessToken, refreshToken: refreshToken})
})

router.post('/login', async (req, res)=>{
    const { loginEmail, loginPassword } = req.body
    const response = await axios.get('http://localhost:3005/users')
    let user = await response.data.find(user=>{ return user.email === loginEmail })
    let isMatch = false
    if (user) isMatch = await bcrypt.compare(loginPassword , user.password)
        if (!user || !isMatch) {
            return res.status(200).json({
                status:  'failed',
            })

        }else{
            const accessToken = jwt.sign({ loginEmail }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
            const refreshToken = jwt.sign({ loginEmail },process.env.REFRESH_TOKEN_SECRET, {expiresIn: "10m" });
            res.status(200).json({accessToken, refreshToken, status: 'success'})
        }
    

})

router.post('/authenticate', async (req,res)=>{
    const token = req.headers["authorization"] && req.headers["authorization"].split(' ')[1]
    console.log(req.headers ,'xxxxxxxxxxxxxxxxxxxxx');
    console.log(req.headers["authorization"],'skljfkljfs');
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(user,'userrrrrrrrrrrr');
    req.user = user.loginEmail;
    return res.status(200).json({status: 'success'})
})

module.exports = router