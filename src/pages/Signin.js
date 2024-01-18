import { useEffect, useState } from "react"
import Register from "../components/signupForm/Register"
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [signup] = useState(false);
    const [userNotexistErr, setUserNotexistErr] = useState("");
    const [passwordMismatch, setPasswordmisMatch] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("session");
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [])
    const submitHandler = async (check, formdata) => {
        try {
            const response = await fetch(`http://localhost:3031/user`);
            const users = await response.json();
            const found = users.find((u) => u.formdata.email.toLowerCase() === formdata.email.toLowerCase())
            if (!found) {
                setUserNotexistErr("User not found!")
            } else if (found.formdata.password !== formdata.password) {
                setPasswordmisMatch("Incorrect Password!");
            }
            else {
                const token = "###" + Math.random(1) * 1000 + "?" + found.id;
                localStorage.setItem("session", JSON.stringify({
                    token, email: found.formdata.email,
                }))
                setUserNotexistErr("");
                setPasswordmisMatch("");
                navigate("/")
            }

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="bg">
            <Register register={signup} onsubmit={submitHandler} notExistError={userNotexistErr} passwordError={passwordMismatch} />
        </div>
    )
}