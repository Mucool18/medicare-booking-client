import React, { useState } from 'react';
import signupImg from "../assets/images/signup.gif";
import avatar from '../assets/images/doctor-img01.png';
import { Link, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../config.js';
import axios from "axios";
import HashLoader from "react-spinners/HashLoader"
import {toast} from "react-toastify"

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "male",
    role: "patient",
  });
  const navigate = useNavigate()
  const handleInputChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const handleFileInputChange = (event) =>{
    const fileLoaded = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(fileLoaded); // read file as data url

    reader.onload = async (loadEvent) => { // called once readAsDataURL is completed
      const file = reader.result;
      file.replace(/^data:application\/\w+;base64,/, "")
      let config = {
        method: 'post',
        url: "http://localhost:5000/api/v1/awsService/upload",
        data: {file, fileName: fileLoaded.name.replace(/\s+/g, "")}
      }
      try {
        setLoading(true);
        const response = await axios(config);
        if(response.status=== 200 && response.data.success){
          console.log("sucessed ")
          setPreviewUrl(file);
          setSelectedFile(file);
          setFormData({...formData, photo: response.data.data.Key});
          setLoading(false);
        }else{
          toast.error("Failed to upload");
          setLoading(false);
        }
        
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
      
    }
  }
  const submitHandler = async e => {
    console.log("submit data =< ", formData);
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers:{
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
      })
      const {message} = await res.json();
      if(!res.ok){
        console.log("this is error statement")
        throw new Error(message)
      }
      setLoading(false);
      toast.success(message);
      navigate('/login')
    } catch (err) {
      console.log("catch error")
      toast.error(err.message);
      setLoading(false);
    }
  }
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ///// img box //////// */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg"/>
            </figure>
          </div>
          {/* //////  signup form  ////////// */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input 
                  type="text" 
                  placeholder='Full Name' 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input 
                  type="email" 
                  placeholder='Enter Your Email' 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input 
                  type="password" 
                  placeholder='Password' 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7 ">
                  Are you a:
                  <select value={formData.role} onChange={handleInputChange} name="role" className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
                <label className="text-headingColor font-bold text-[16px] leading-7 ">
                  Gender:
                  <select value={formData.gender} onChange={handleInputChange} name="gender" className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>  
              </div>
              <div className="mb-5 flex items-center gap-3">
                {selectedFile && 
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img src={previewUrl} alt="" className="w-full rounded-full" />
                  </figure>
                }
                <div className="relative w-[160px] h-[50px]">
                  <input onChange={handleFileInputChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" type="file" name="photo" id="customFile" accept='.jpg, .png' />
                  <label 
                    htmlFor="customFile" 
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff34] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className="mt-7">
                <button disabled={loading && true} type="submit" className="w-full  bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg py-3 px-4 ">{loading ? <HashLoader size={25} color='#ffffff' /> :"Sign Up"}</button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Already have an account ?  <Link to="/login" className="text-primaryColor font-medium ml-1 ">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup