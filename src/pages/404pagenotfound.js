import { useContext, useEffect } from "react"
import context from "../context/navContext"

export default function PageNotFound() {
    const { notFound } = useContext(context)
    useEffect(() => {
        notFound("hidden")
    }, [])
    return (
        <div className=" relative top-[300px]">
            <div className="flex justify-center">
                <h1 className=" text-red-600 text-[40px] max-[458px]:text-[30px] max-[336px]:text-[20px]">404</h1>
                <h1 className=" ml-1 text-[40px] max-[458px]:text-[30px] max-[336px]:text-[20px]">Page Not Found</h1>
                <h1 className=" text-red-600 text-[40px] max-[458px]:text-[30px] max-[336px]:text-[20px]">!</h1>
            </div>
        </div>
    )
}