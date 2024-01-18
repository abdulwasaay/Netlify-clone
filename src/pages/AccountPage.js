import { useEffect } from "react";
import AccountComponent from "../components/Accountcomp/AccComp";
import { useNavigate } from "react-router-dom";

export default function AccountsPage() {
    const token = localStorage.getItem("session");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/signin")
        }
    }, [])
    return (
        <AccountComponent />
    )
}