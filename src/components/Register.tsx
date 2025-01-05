"use client";
import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { User } from "../interfaces/User";
import * as yup from "yup";
import { Name } from "../interfaces/Name";
import { Address } from "../interfaces/Address";
import { Image } from "../interfaces/Image";
import { Checkbox, Label, FloatingLabel } from "flowbite-react";
import { addUser, loginUser } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import "../style/Register.css"

interface RegisterProps {
    
}
 
const Register: FunctionComponent<RegisterProps> = () => {
    const navigate = useNavigate();
    const name:Name = {
        first:"",
        middle:"",
        last:""
    }
    const image:Image = {
        url:"",
        alt:""
    }
    const address:Address = {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber:"",
        zip:0
    }
    const formik: FormikValues = useFormik<User>({
        initialValues:{
        name,
        phone:"",
        email:"",
        password:"",
        image,
        address,
        isBusiness:false
        },
        validationSchema: yup.object({
            name:yup.object({
                first: yup.string().required("first name is required").min(2),
                middle: yup.string().min(2),
                last: yup.string().required("last name is required").min(2),
            }),
            phone: yup.string().required().matches(/^(\+972|972|0)?(5[0-9]|[23489])[-]?\d{7}$/, "Invalid phone number format"),
            email: yup.string().required().email(),
            password: yup.string().required("Password must be at least 9 and include an uppercase letter, lowercase letter, number, and one special character")
            .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-]).{9,}$/,),
            image:yup.object({
                url: yup.string().url(),
                alt: yup.string().min(2),
            }),
            address:yup.object({
                state: yup.string().min(2),
                country: yup.string().required("country is required").min(2),
                city: yup.string().required("city address number is required").min(2),
                street: yup.string().required("street address is required").min(2),
                houseNumber: yup.string().required("house number is required"),
                zip: yup.number()
            }),
            isBusiness: yup.boolean()
        }),
        onSubmit: (values)=>{
            addUser({...values, isAdmin: false})
            .then((res)=> loginUser(values.email, values.password).then((res) => { 
                localStorage.setItem("token",(res.data))
                navigate("/");
            }).catch((err)=>{
                navigate("/login")
            })
            ).catch((err)=>{
                
                alert(err.response.data)
            })
            
        }
    })
    return (  
        <div className="container">
            <div className="title-container">
        <h2 className="page-title">REGISTER</h2>
        <h5 className="page-subtitle">Create Your Account - Join us today and unlock the full potential of your business!</h5>
        </div>
        
        <div className="register-form " >
        <form onSubmit={formik.handleSubmit} className="form">

        <div className="label-col">
        <div  className="label-input">
        <FloatingLabel variant="outlined" label="First name*" type="text"
        name="name.first" id="name.first" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.first}/>
        {formik.touched.name?.first && formik.errors.name?.first && <p className="text-danger text-start">{formik.errors.name?.first}</p>}
        </div>
        <div>
            <FloatingLabel variant="outlined" label="Middle name" type="text"
            name="name.middle" id="name.middle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.middle} />
        </div>
        </div>

        <div className="label-col">
        <div className="label-input">
        <FloatingLabel variant="outlined" label="Last name*" type="text" name="name.last" id="name.last" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name.last} />
        {formik.touched.name?.last && formik.errors.name?.last && <p className="text-danger text-start">{formik.errors.name?.last}</p>}
        </div>
        <div><FloatingLabel variant="outlined" label="Phone*" type="text" name="phone"  id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
        {formik.touched.phone && formik.errors.phone && <p className="text-danger text-start">{formik.errors.phone}</p>}
        </div>
        </div>

        <div className="label-col">
        <div className="label-input">
            <FloatingLabel variant="outlined" label="Email*" type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
        {formik.touched.email && formik.errors.email && <p className="text-danger text-start">{formik.errors.email}</p>}
        </div>
        <div><FloatingLabel variant="outlined" label="Password*" type="text" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
        {formik.touched.password && formik.errors.password && <p className="text-danger text-start">{formik.errors.password}</p>}
        </div>
        </div>

        <div className="label-col">
        <div className="label-input">
        <FloatingLabel variant="outlined" label="Image url" type="text"
        name="image.url" id="image.url" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image.url}/></div>
        
        <div><FloatingLabel variant="outlined" label="Image alt" type="text" name="image.alt" id="image.alt"onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image.alt}/></div>
        </div>

        <div className="label-col">
        <div className="label-input">
        <FloatingLabel variant="outlined" label="State" type="text"
        name="address.state" id="address.state" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.state}/></div>
        <div><FloatingLabel variant="outlined" label="Country*" type="text"
        name="address.country" id="address.country" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.country} />
        {formik.touched.address?.country && formik.errors.address?.country && <p className="text-danger text-start">{formik.errors.address?.country}</p>}</div>
        </div>

        <div className="label-col">
        <div className="label-input">
        <FloatingLabel variant="outlined" label="City*" type="text" name="address.city" id="address.city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.city} />
        {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger text-start">{formik.errors.address?.city}</p>}</div>
        <div><FloatingLabel variant="outlined" label="Street*" type="text" name="address.street" id="address.street" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.street} />
        {formik.touched.address?.street && formik.errors.address?.street && <p className="text-danger text-start">{formik.errors.address?.street}</p>}</div>
        </div>

        <div className="label-col">
        <div className="label-input">
        <FloatingLabel variant="outlined" label="House number*" type="text" name="address.houseNumber" id="address.housNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.houseNumber} />
        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger text-start">{formik.errors.address?.houseNumber}</p>}</div>
        <div><FloatingLabel variant="outlined" label="Zip" type="number"
        name="address.zip" id="address.zip" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.zip}/></div>
        </div>

        <div className="flex items-center">
        <Checkbox name="isBusiness" id="isBusiness" checked={formik.values.isBusiness} onChange={formik.handleChange}  />
        <Label htmlFor="remember">Signup as business</Label>
        </div>

        <button className="form-button" type="submit" disabled={!formik.dirty || !formik.isValid}>Submit</button>

      
    </form>
        </div>
    </div>);
}
 
export default Register;