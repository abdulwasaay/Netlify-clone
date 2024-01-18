// popular : 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
// top rated : 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
// upcomming : 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
// trending : 'https://api.themoviedb.org/3/trending/movie/day?language=en-USpage=2'
// horror : 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1'

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import context from "../../context/navContext";


export default function Navbar() {
    const { hidden } = useContext(context);
    const token = localStorage.getItem("session");
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("session");
        navigate("/signin")
    }
    return (
        <section className={` w-full absolute z-[100] ${hidden}`}>
            <nav className=" flex justify-between mt-2">
                <h1 className=" ml-[20px] text-[28px] text-red-700 font-bold max-[417px]:text-[19px] max-[325px]:text-[15px] max-[325px]:mt-[3px]"><Link to="/">NETFLIX</Link></h1>
                {
                    token ? (
                        <div className=" mr-[20px] mt-2 max-[417px]:mt-[0]">
                            <button onClick={() => navigate("/account")} className=" mr-4 text-[14px] max-[417px]:text-[10px]  max-[325px]:text-[7px]">
                                Account
                            </button>
                            <button onClick={logoutHandler} className=" bg-red-700 pt-1 pb-1 pr-4 pl-4 rounded-sm text-[14px] max-[417px]:text-[10px] max-[325px]:text-[7px]">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className=" mr-[20px] mt-2 max-[417px]:mt-[0]">
                            <button onClick={() => navigate("/signin")} className=" mr-4 text-[14px] max-[417px]:text-[10px]  max-[325px]:text-[7px]">
                                Sign In
                            </button>
                            <button onClick={() => navigate("/signup")} className=" bg-red-700 pt-1 pb-1 pr-4 pl-4 rounded-sm text-[14px] max-[417px]:text-[10px] max-[325px]:text-[7px]">
                                Sign Up
                            </button>
                        </div>
                    )
                }
            </nav>
        </section>
    )
}