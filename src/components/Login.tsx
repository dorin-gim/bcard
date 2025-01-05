"use client";

import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { User } from "../interfaces/User";
import * as yup from "yup";
import { FloatingLabel } from "flowbite-react";
import "../style/Login.css"
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { loginUser } from "../services/usersService";
import { useAuth } from "./context/AuthProvider";

interface LoginProps {
}
 
const Login: FunctionComponent<LoginProps> = () => {
    const {login} = useAuth();
    const navigate: NavigateFunction = useNavigate()
    const formik: FormikValues = useFormik<User>({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required("Password is required.")
            .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,}$/,
            "Password must be at least 9 characters long and include an uppercase letter, a lowercase letter, a number, and one special     character (!@#$%^&*-).")
        }),
        onSubmit: (values) =>{
            loginUser(values.email,values.password).then((res)=>{
                if (res.data){
                login()
                localStorage.setItem("token",(res.data))
                navigate("/")    
                }
                else{alert ("opssss")}
            }).catch((err)=> {
            alert (err.response.data)
        });
        }
    })
    return ( 
    <div className="container">
        <div className="title-container">
        <h2 className="page-title">Login</h2>
        <h5 className="page-subtitle">Log in to stay connected and manage your business effortlessly</h5>
        </div>
        <div>
            <form className="login-form" onSubmit={formik.handleSubmit}>
        <div className="form-labels">
            <FloatingLabel variant="outlined" label="Email" type="email"
            name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
            {formik.touched.email && formik.errors.email && <p className="text-danger text-start">{formik.errors.email}</p>}
            </div>
            <div className="form-labels">
            <FloatingLabel variant="outlined" label="password" type="password"
            name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
            {formik.touched.password && formik.errors.password && <p className="text-danger text-start">{formik.errors.password}</p>}
            </div>
          <button className="form-button" type="submit" disabled={!formik.dirty || !formik.isValid} >Login</button>
          </form>
        </div>

        <p>
          <Link to="/register" className="link-register">New user? Register now</Link></p>
        
    </div> );
}
 
export default Login;