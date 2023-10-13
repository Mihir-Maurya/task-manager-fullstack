import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
   
    const navigate = useNavigate();
    const [user,setUser] = useState({name:'',email:'',password:''})
    const [userLogin,setUserLogin] = useState({email:'',password:''});
    const [account , toggleAccount] = useState('login');
    const inputChange = (e)=>{
        //   console.log([e.target.name],e.target.value);
        setUser({...user , [e.target.name]:e.target.value});
        if(account==='login'){
         
        setUserLogin({...userLogin , [e.target.name]:e.target.value});
         }
    }

    useEffect(()=>{
        const token =  localStorage.getItem("token");
        if(token)   
        navigate("/api/tasks");
    },[]);
    
    const registerUser = async (e)=>{
        e.preventDefault();
        // console.log(user);
        if (user.email === '' || user.password === '' || user.name === '') {
            return toast.error('Email and password are required fields');
          }
        try {
            
           const response= await axios.post(`${URL}/register`,{...user});
           
           if(response.status === 200){

               toast.success('User register successfully');

                   setUser({name:'',email:'',password:''})
               
               
               // navigate('/tasks');
           }

           else if(response.status === 400)
           toast.error('User already register ');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle the case where a user with the same email already exists
                toast.error('User already exists');
              } else {
                // Handle other errors (e.g., server errors)
                toast.error('User registration failed');
              }  
        }
        
        
    }
    
    const loginUser = async(e)=>{
        e.preventDefault();
        // console.log(e.target.value);
        if (userLogin.email === '' || userLogin.password === '') {
            return toast.error('Email and password are required fields');
          }
        try {
            const response =await axios.post(`${URL}/login`,userLogin)
            
            
    if (response.status === 200) {
      // Check if the response contains a token property
      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        // Optionally, you can also set it in your state if needed
        // setUserToken(response.data.token);

        toast.success('User login successful');
        setUserLogin({ email: '', password: '' });

        // Redirect to your tasks page or perform other actions as needed
        navigate('/api/tasks');
      } else {
        // Handle the case where the token is not present in the response
        toast.error('Token not found in the response');
      }
    }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle the case where a user with the same email already exists
                toast.error('password is wrong');
              } else {
                // Handle other errors (e.g., server errors)
                toast.error('User not found');
              }  
        }
    }


    
  return (
    <>{
    account === 'login'? <div  style={{ fontSize:'2rem' , maxWidth:'450px', marginTop:'150px' , backgroundColor:'#fff',borderRadius:'5px' , padding:'20px 30px' , boxShadow:'0 8 2 5 rgb(0 0 0/7)'}}>
    <h2 style={{textAlign:'center'}}>Login</h2>
    <form onSubmit={(e)=>loginUser(e)}>
  
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input style={{padding:'10px 20px', fontSize:'2rem'}} value={userLogin.email} onChange={(e)=>inputChange(e)}  name='email' placeholder='Enter email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input style={{padding:'10px 20px', fontSize:'2rem'}} value={userLogin.password} onChange={(e)=>inputChange(e)}  name='password' placeholder='Enter password' type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button type="submit"  class="btn btn-primary" style={{padding:'10px 20px', fontSize:'2rem' , width:'100%' , display:'inline-block'}}>Login</button> <br />
  <span style={{marginTop:'1.5rem',marginRight:'10px', display:'inline-block'}}>New User</span>
  <button onClick={()=>toggleAccount('register')} style={{padding:'8px 18px' , fontSize:'18px'}} type="button" class="btn btn-outline-primary">Register</button>
 
</form>
    </div>:  
    <div  style={{ fontSize:'2rem' , maxWidth:'450px', marginTop:'150px' , backgroundColor:'#fff',borderRadius:'5px' , padding:'20px 30px' , boxShadow:'0 8 2 5 rgb(0 0 0/7)'}}>
    <h2 style={{textAlign:'center'}}>Register</h2>
    <form onSubmit={(e)=>registerUser(e)}>
  <div class="mb-3">
    <label for="exampleInputname" class="form-label">Name</label>
    <input style={{padding:'10px 20px', fontSize:'2rem'}} value={user.name} onChange={(e)=>inputChange(e)} name='name' placeholder='Enter name' type="text" class="form-control" id="exampleInputname" aria-describedby="nameHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input style={{padding:'10px 20px', fontSize:'2rem'}} value={user.email} onChange={(e)=>inputChange(e)} name='email' placeholder='Enter email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input style={{padding:'10px 20px', fontSize:'2rem'}} value={user.password} onChange={(e)=>inputChange(e)} name='password' placeholder='Enter password' type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button type="submit"  class="btn btn-primary" style={{padding:'10px 20px', fontSize:'2rem' , width:'100%' , display:'inline-block'}}>Register</button> <br />
  <span style={{marginTop:'1.5rem',marginRight:'10px', display:'inline-block'}}>Already register</span>
  <button onClick={()=>toggleAccount('login')}  style={{padding:'8px 18px' , fontSize:'18px'}}  type="button" class="btn btn-outline-primary">Login</button>
 
</form>
    </div>
  }     
    </>
  )
}

export default Register