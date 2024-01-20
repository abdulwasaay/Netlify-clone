import { useEffect, useState } from "react"
import Register from "../components/signupForm/Register"
import "./style.css"
import { useNavigate } from "react-router-dom";
import { addData } from "../services/formmethods";

export default function Signup() {
    const [signup, setSignup] = useState(true);
    const [userexistErr, setUserexistErr] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("session");
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [])
    const submitHandler = async (check, formdata) => {
        try {
            await addData(formdata.email,formdata.password,check);
            setUserexistErr("")
            alert("Signup successfull");
            navigate("/signin")
        } catch (err) {
            setUserexistErr("User already Exists")
            console.log(err)
        }
    };
    return (
        <div className="bg">
            <Register register={signup} onsubmit={submitHandler} existError={userexistErr} />
        </div>
    )
}