import { useEffect, useState } from "react"
import Register from "../components/signupForm/Register"
import { useNavigate } from "react-router-dom";
import { getByEmail, getByPassword } from "../services/formmethods";

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
            const user = await getByEmail(formdata.email);
                if(!user){
                    setUserNotexistErr("User doesnot found !");
                }
                const userPassword = await getByPassword(formdata.password,user.password)
                if(!userPassword){
                    setPasswordmisMatch("Incorect password !");
                }
            else {
                const token = "###" + Math.random(1) * 1000 + "?" + user.id;
                localStorage.setItem("session", JSON.stringify({
                    token, email: user.email,
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