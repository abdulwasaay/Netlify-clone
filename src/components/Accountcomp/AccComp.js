import { useState } from "react";
import "../../pages/style.css"
import { useEffect } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';


export default function AccountComponent() {
    const [selectedmovs, setSelectedmovs] = useState([]);
    const [deletes, setDelete] = useState(false)

    const token = localStorage.getItem("session");
    const data = JSON.parse(token);

    const scrollRight = () => {
        let slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 200
    }

    const scrollLeft = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 200
    }

    useEffect(() => {
        const res = fetch("http://localhost:3031/movies")
        res.then((response) => {
            return response.json()
        }).then((resp) => {
            const arr = resp.filter((r) => {
                if (r.userMovie === data.email) {
                    return r
                }
            })
            setSelectedmovs(arr)
        }).catch((err) => {
            console.log(err)
        })
    }, [deletes]);

    const maps = selectedmovs.map((movs) => {
        return (
            <div className="w-[400px] inline-block mr-[10px] ml-[10px] relative overflow-hidden">
                <img src={`https://image.tmdb.org/t/p/w500${movs.URL}`} className=" w-[400px] h-[214px]" />
                <div className=" absolute top-[0] bg-black w-[400px] h-[214px] opacity-0 hover:opacity-80 hover:cursor-pointer" >
                    <button className="mt-[10px] ml-[10px]" onClick={async () => {
                        try {
                            const response = await fetch(`http://localhost:3031/movies/${movs.id}`, {
                                method: "DELETE",
                            })
                            setDelete(!deletes)
                        } catch (err) {
                            console.log(err)
                        }
                    }}><CloseIcon /></button>
                    <h4 className=" text-center relative top-20">{movs.title}</h4>
                </div>
            </div>
        )
    })

    return (
        <div className=" relative">
            <div className="bg2">
            </div>
            <div className=" w-full">
                <h1 className=" mt-[20px] mb-[20px] ml-[10px] text-[18px] text-white">My Shows</h1>
                <div className=" overflow-x-hidden max-[712px]:overflow-x-auto whitespace-nowrap" id="slider">
                    {maps}
                </div>
                {
                    selectedmovs.length > 0 ? (
                        <div className=" w-full flex justify-end absolute top-[413px] pr-6">
                            <div><button onClick={scrollLeft} className="w-[40px] h-[40px] bg-slate-400 rounded-full"><KeyboardArrowLeftIcon /></button></div>
                            <div className=" relative left-3"><button onClick={scrollRight} className="w-[40px] h-[40px] bg-slate-400 rounded-full"><KeyboardArrowRightIcon /></button></div>
                        </div>
                    ) : (
                        <div> </div>
                    )
                }
            </div>
        </div>
    )
}