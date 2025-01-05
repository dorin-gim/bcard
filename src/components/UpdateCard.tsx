import { FunctionComponent } from "react";
import { Address } from "../interfaces/Address";
import { FormikValues, useFormik } from "formik";
import { Image } from "../interfaces/Image";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { Button, FloatingLabel } from "flowbite-react";
import { updateCard } from "../services/cardsService";

interface UpdateCardProps {
    show: boolean;
    onClose: Function;
    refresh: Function;
    card: Card;
}
 
const UpdateCard: FunctionComponent<UpdateCardProps> = ({show,onClose,refresh, card}) => {

        const address:Address = {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber:"",
        zip:0
    }

    const image:Image={
        url:"",
        alt:""
    }
    delete card.image._id
    delete card.address._id
    delete card.likes
    delete card.createdAt
    delete card.__v
    const formik: FormikValues = useFormik<Card>({
        initialValues:card,
    validationSchema:yup.object({
        title: yup.string().required().min(2),
            subtitle: yup.string().required().min(2),
            description: yup.string().required().min(2),
            phone: yup.string().required().matches(/^(\+972|972|0)?(5[0-9]|[23489])[-]?\d{7}$/, "Invalid phone number format"),
            email: yup.string().email().required(),
            web: yup.string().url(),
            image: yup.object({
                url: yup.string().url(),
                alt: yup.string().min(2)
    }),
    address:yup.object({
        state: yup.string().min(2),
            country: yup.string().required("country is required").min(2),
            city: yup.string().required("city is required").min(2),
            street: yup.string().required("street is required").min(2),
            houseNumber: yup.string().required("houseNumber is required").min(1),
            zip: yup.number()
    }),
    
}),
onSubmit : (values)=>{
     const _id = values._id ?? "";
     const tempValues = {...values}
     delete tempValues._id
     updateCard(_id,{...tempValues});
     onClose()
    refresh && refresh()
    }
    })

    return ( <div className="modal-container">
    <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-flow-col space-x-4">
        <div>
        <FloatingLabel variant="outlined" label="Title*" type="text" name="title" id="title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}/>{formik.touched.title && formik.errors.title && <p className="text-danger text-start">{formik.errors.title}</p>}
        </div>
        <div>
        <FloatingLabel variant="outlined" label="Subtitle*" type="text" name="subtitle" id="subtitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.subtitle}/>{formik.touched.subtitle && formik.errors.subtitle && <p className="text-danger text-start">{formik.errors.subtitle}</p>}
        </div>
        
        </div>

        <div className="grid grid-flow-col space-x-4">
        <div>
        <FloatingLabel label={"Description*"} variant={"outlined"} type="text" name="description" id="description" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description}/>{formik.touched.description && formik.errors.description && <p className="text-danger text-start">{formik.errors.description}</p>}
        </div>

        <div>
        <FloatingLabel label={"Phone*"} variant={"outlined"} type="text" name="phone" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>{formik.touched.phone && formik.errors.phone && <p className="text-danger text-start">{formik.errors.phone}</p>}
        </div>
        </div>

        <div className="grid grid-flow-col space-x-4">
        <div>
        <FloatingLabel label={"Email*"} variant={"outlined"} type="text" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>{formik.touched.email && formik.errors.email && <p className="text-danger text-start">{formik.errors.email}</p>}
        </div>

        <div>
        <FloatingLabel label={"Web"} variant={"outlined"} type="text" name="web" id="web" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.web}/>
        </div>
        </div>

        <div className="grid grid-flow-col space-x-4">
        <div>
        <FloatingLabel variant="outlined" label="Image url" type="text"
        name="image.url" id="image.url" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image.url}/>
        </div>

        <div>
        <FloatingLabel variant="outlined" label="Image alt" type="text" name="image.alt" id="image.alt"onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image.alt}/>
        </div>
        </div>


        <div className="grid grid-flow-col justify-stretch space-x-4">
        <div><FloatingLabel variant="outlined" label="State" type="text"
        name="address.state" id="address.state" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.state}/></div>

        <div><FloatingLabel variant="outlined" label="Country*" type="text"
        name="address.country" id="address.country" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.country} />
        {formik.touched.address?.country && formik.errors.address?.country && <p className="text-danger text-start">{formik.errors.address?.country}</p>}</div>
        </div>

        <div className="grid grid-flow-col justify-stretch space-x-4">
        <div><FloatingLabel variant="outlined" label="City*" type="text" name="address.city" id="address.city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.city} />
        {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger text-start">{formik.errors.address?.city}</p>}</div>

        <div><FloatingLabel variant="outlined" label="Street*" type="text" name="address.street" id="address.street" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.street} />
        {formik.touched.address?.street && formik.errors.address?.street && <p className="text-danger text-start">{formik.errors.address?.street}</p>}</div>
        </div>

        <div className="grid grid-flow-col justify-stretch space-x-4">
        <div><FloatingLabel variant="outlined" label="House number*" type="text" name="address.houseNumber" id="address.housNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.houseNumber} />
        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger text-start">{formik.errors.address?.houseNumber}</p>}</div>
        <div><FloatingLabel variant="outlined" label="Zip" type="number"
        name="address.zip" id="address.zip" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address.zip}/></div>
        </div>

        <div className="button-container">
        <Button type="submit" disabled={!formik.dirty || !formik.isValid}>submit</Button>
        </div>
    </form>
    </div> );
}
 
export default UpdateCard;