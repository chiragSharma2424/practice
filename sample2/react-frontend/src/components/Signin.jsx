import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Signin() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-slate-800 to-teal-700 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
          Welcome Back 👋
        </h2>

       
        <div className="space-y-6">
          <div>
            <label className="block text-white text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
          </div>

      
          <div>
            <label className="block text-white text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>

         
          <button

            onClick={() => {
              axios.post('http://localhost:5000/api/users/signin', {
                email: email,
                password: password
              }).then((res) => {
                console.log(res.data);
              }).catch((err) => {
                console.log(`error while sending requst ${err}`);
              })
              
            }}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-400/40">
            Sign In
          </button>
        </div>

        
        <p className="text-center text-sm text-gray-200 mt-8">
          Don’t have an account?{" "}
          <button  className="text-teal-300 hover:underline"
            onClick={() => {
                Navigate('/signup')
            }}>
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
