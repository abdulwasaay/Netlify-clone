import { useEffect, useState } from "react"

export default function Header() {
    const [movies, setMovie] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (count === 19) {
                setCount(0)
            } else {
                setCount(count + 1)
            }
        }, 10000)
        return () => clearInterval(interval)
    }, [count])
    useEffect(() => {
        const res = fetch('https://api.themoviedb.org/3/movie/popular?api_key=8eb990dfd79065b302712d80f8daa38e&language=en-US&page=1')
        res.then((response) => {
            return response.json()
        }).then((resp) => {
            setMovie(resp.results)
            console.log(resp.results)
        })
    }, [])
    return (
        <div className=" w-full h-[550px]">
            <div className=" w-full h-[550px]" >
                <div className=" absolute w-full h-[550px]  bg-gradient-to-r from-black"></div>
                <img src={`https://image.tmdb.org/t/p/w500${movies[count]?.backdrop_path}`}
                    className=" w-full h-full object-cover"
                />
            </div>
            <div className=" absolute top-[200px] left-9 max-[549px]:top-[150px] max-[491px]:left-6 max-[309px]:top-[100px]">
                <h1 className=" mr-[20px] text-[40px] font-bold w-[100%] max-[1167px]:text-[30px] max-[897px]:text-[25px] max-[783px]:w-[70%] max-[491px]:text-[20px]">{movies[count]?.title}</h1>
                <div>
                    <button className=" bg-gray-300 text-black text-[14px] font-bold pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-sm max-[491px]:text-[10px]">Play</button>
                    <button className=" ml-4 border-[2px] pt-[5px] pb-[5px] pl-[10px] pr-[10px] text-[14px] font-bold rounded-sm max-[491px]:text-[10px]">Watch Later</button>
                </div>
                <p className=" mt-[20px] text-[13px] text-gray-400 max-[491px]:text-[10px]">Released: {movies[count]?.release_date}</p>
                <p className=" w-[70%] break-words text-[15px] text-gray-300 max-[491px]:text-[12px]">{movies[count]?.overview}</p>
            </div>
        </div>
    )
}