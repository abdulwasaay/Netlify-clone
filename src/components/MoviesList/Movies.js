import { useEffect, useState } from "react"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Movie from "./Movie";

export default function Movies({ name, reqPath, uId }) {
    const [movie, setMovie] = useState([]);
    const scrollRight = () => {
        let slider = document.getElementById(uId);
        slider.scrollLeft = slider.scrollLeft + 200
    }

    const scrollLeft = () => {
        const slider = document.getElementById(uId);
        slider.scrollLeft = slider.scrollLeft - 200
    }

    useEffect(() => {
        const res = fetch(reqPath)
        res.then((response) => {
            return response.json()
        }).then((resp) => {
            setMovie(resp.results)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const maps = movie.map((mov, ind) => {
        return <Movie mov={mov} key={ind} ids={ind} unique={uId} />
    })
    return (
        <div className=" relative">
            <h1 className=" mt-[20px] mb-[20px] ml-[10px] text-[18px] text-white">{name}</h1>
            <section className=" w-full overflow-x-hidden max-[712px]:overflow-x-auto" id={uId}>
                <div className=" relative">
                    <div className="flex w-[8000px]">
                        {maps}
                    </div>
                </div>
            </section>
            <div className=" flex justify-end absolute w-full top-[0px] pr-6">
                <div><button onClick={scrollLeft} className="w-[30px] h-[30px] bg-slate-400 rounded-full"><KeyboardArrowLeftIcon /></button></div>
                <div className=" relative left-3"><button onClick={scrollRight} className="w-[30px] h-[30px] bg-slate-400 rounded-full"><KeyboardArrowRightIcon /></button></div>
            </div>
        </div>
    )
}