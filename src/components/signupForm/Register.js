import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ register, onsubmit, existError, notExistError, passwordError }) {
    const [isChecked, setIsChecked] = useState(false);
    const [passwordLengthErr, setPasswordLengthErr] = useState("");
    const [formData, setFormdata] = useState([{
        email: "",
        password: "",
    }]);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!,@#$%^&*])[A-Za-z\d!,@#$%^&*]{8,}$/;

    const SignupHandler = (e) => {
        e.preventDefault();
        if (regex.test(formData.password)) {
            onsubmit(isChecked, formData)
            setFormdata({
                email: "",
                password: "",
            })
            setIsChecked(false)
            setPasswordLengthErr("")
        } else {
            setPasswordLengthErr("Password must be strong!")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormdata((prevval) => ({
            ...prevval,
            [name]: value,
        }));

    }
    const handleCheckChange = () => {
        setIsChecked((prevchecked) => !prevchecked)
    }

    return (
        <section>
            <form onSubmit={SignupHandler} className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] pt-[50px] pb-[100px] max-[418px]:w-[90%]" style={{ background: "linear-gradient(rgba(0, 0, 0, 0.737),rgba(0, 0, 0, 0.737))" }}>
                {
                    register ? (
                        <>
                            <h1 className=" opacity-[1] ml-[40px] mr-[40px] font-bold text-[25px] text-center">Sign Up</h1>
                            <h1 className=" text-center text-red-700">{existError}</h1>
                        </>
                    ) : (
                        <>
                            <h1 className=" opacity-[1] ml-[40px] mr-[40px] font-bold text-[25px] text-center">Sign In</h1>
                            <h1 className=" text-center text-red-700">{notExistError}</h1>
                        </>
                    )
                }
                <div className=" flex flex-col items-center">
                    <input onChange={handleChange} name="email" value={formData.email} type="email" placeholder="Email" required className="text-white w-[295px] ml-[40px] mr-[40px] opacity-[1] mt-[15px] text-[12px] p-[8px] bg-gray-800 border-none outline-blue-900 max-[418px]:w-[79%]" /><br />
                    <input onChange={handleChange} name="password" value={formData.password} type="password" placeholder="Password" required className="text-white w-[295px] ml-[40px] mr-[40px] opacity-[1] text-[12px] p-[8px] bg-gray-800 border-none outline-blue-900 max-[418px]:w-[79%]" /><br />
                    <h1 className=" text-center text-red-700">{passwordError}</h1>
                </div>
                <div>
                    <h1 className=" text-center text-red-700">{passwordLengthErr}</h1>
                </div>
                {
                    register ? (
                        <div className=" flex flex-col items-center">
                            <button type="submit" className=" w-[295px] opacity-[1] text-center ml-[40px] mr-[40px] bg-red-700 text-[12px] pt-[8px] pb-[8px] rounded-[3px] mt-[23px] max-[418px]:w-[79%]">Sign Up</button>
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center">
                            <button className="w-[295px] opacity-[1] text-center ml-[40px] mr-[40px] bg-red-700 text-[12px] pt-[8px] pb-[8px] rounded-[3px] mt-[23px] max-[418px]:w-[79%]">Sign In</button>
                        </div>
                    )
                }
                <div className=" flex justify-between ml-[40px] mr-[40px] opacity-[1] mt-[15px]">
                    <div >
                        <label className=" flex cursor-pointer">
                            <input type="checkbox" onChange={handleCheckChange} name="checked" checked={isChecked} required className="w-[12px] cursor-pointer" /> <p className="text-[11px] mt-[2px] ml-1 text-gray-600 max-[317px]:text-[10px]">Remember me</p>
                        </label>
                    </div>
                    <p className=" cursor-pointer text-[11px] mt-[2px] ml-1 text-gray-600 max-[317px]:text-[10px]">Need Help?</p>
                </div>
                {
                    register ? (
                        <p className=" opacity-[1] text-[11px] ml-[40px] mr-[40px] mt-[25px] text-gray-600 max-[291px]:text-[10px]">Already subscribed to Netflix?<Link to="/signin" className=" text-white">Sign In</Link></p>
                    ) : (
                        <p className=" opacity-[1] text-[11px] ml-[40px] mr-[40px] mt-[25px] text-gray-600 max-[297px]:text-[10px]">Don't have an account?<Link to="/signup" className=" text-white">Sign Up</Link></p>
                    )
                }
            </form>
        </section>
    )
}