import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const Navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
       
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
          Create Your Account
        </h2>

        
        <div className="space-y-6">
         
          <div>
            <label className="block text-white text-sm mb-2">Full Name</label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
          </div>

          
          <div>
            <label className="block text-white text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => {
                (setEmail(e.target.value));
              }}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"/>
          </div>

        
          <div>
            <label className="block text-white text-sm mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"/>
          </div>

          <button
             onClick={() => {
                fetch('http://localhost:5000/api/users/signup', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {
                        name: name,
                        email: email,
                        password: password
                    }
                }).then((resp) => {
                    return resp.json();
                }).then((data) => {
                    console.log(data);
                }).catch((err) => {
                    console.log(`error in sending request ${err}`);
                })
             }}
            className="w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-400/40">
            Sign Up
          </button>
        </div>

    
        <p className="text-center text-sm text-gray-200 mt-8">
          Already have an account?{" "}
          <button className="text-violet-300 hover:underline"
            onClick={() => {
                Navigate('/signin');
            }}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
