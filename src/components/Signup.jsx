import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin, login } from "../store/features/authSlice";
import { Button, Input, Logo } from "./index";

function Signup() {

 const navigate  = useNavigate();
 const dispatch = useDispatch();
 const {register, handleSubmit} = useForm();
 const [error, setError] = useState("");

const signup = async (data)=>{
    setError("");
    try {
        const session = await authService.createAccount(data)
        if(session){
            const userData = await authService.getCurrentUser();
            if(userData) dispatch(authLogin(userData));
            navigate("/")
        }
    } catch (error) {
        setError(error.message)
    }
} 

  return (
    <div className="flex items-center justify-center w-full">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full mx-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have a account?
          <Link
            to="/singin"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sing In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
            <div className="space-y-5">
              <Input
              label="Full Name:"
              type="text"
              placeholder="Enter your full name"
              {...register("name",{
                required:true
              })}
              />
            <Input
              label="Email: "
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Enter a valid email address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter Your Password"
              type="password"
              {...register("email", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">Sign up</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Signup