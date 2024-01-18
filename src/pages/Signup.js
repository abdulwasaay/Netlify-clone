import { useEffect, useState } from "react"
import Register from "../components/signupForm/Register"
import "./style.css"
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [signup, setSignup] = useState(true);
    const [userexistErr, setUserexistErr] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("session");
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const res = fetch(`http://localhost:3031/user`)
        res.then((r) => {
            return r.json()
        }).then((data) => {
            setUsers(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    const submitHandler = async (check, formdata) => {
        try {
            const found = users.find((u) => u.formdata.email === formdata.email)
            if (found) {
                setUserexistErr("User already Exists")
            } else {
                setUserexistErr("")
                const response = await fetch("http://localhost:3031/user", {
                    method: "POST",
                    body: JSON.stringify({ check, formdata }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                if (response.ok) {
                    alert("Signup successfull");
                    navigate("/signin")
                } else {
                    alert("Signup failed")
                }
            }
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <div className="bg">
            <Register register={signup} onsubmit={submitHandler} existError={userexistErr} />
        </div>
    )
}