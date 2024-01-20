import { useEffect, useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { deleteData, getById, writeData } from "../../services/moviemethods";

export default function Movie({ mov, ids, unique }) {
    const [like, setLike] = useState(false)
    const [add, setAdd] = useState(false)
    const token = localStorage.getItem("session");
    const data = JSON.parse(token);
    const navigate = useNavigate();
    let id;
    if (token) {
        id = "netflixdatabase"+ unique + ids;
    }

    useEffect(() => {
        async function Pro() {
            const found = await getById(id);
            if (found) {
                setLike(true)
            } else {
                setLike(false)
            }
        }
        Pro();
    }, [add])
    const likeHandler = () => {
        if (!token) {
            alert("You have to Login first!");
            navigate("/signin")
        } else {
            try {
                writeData(mov.title, mov.backdrop_path, data.email, id)
                setAdd(!add)
            } catch (err) {
                console.log(err)
            }
        }
    }
    const unlikeHandler = () => {
        if (!token) {
            alert("You have to Login first!");
            navigate("/signin")
        } else {
            try {
                deleteData(id)
                setAdd(!add)
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className="w-[400px] h-[214px] ml-[10px] mr-[10px] relative cursor-pointer">
            <img src={`https://image.tmdb.org/t/p/w500${mov.backdrop_path}`} className=" w-[400px] h-[214px]" />
            <div className=" absolute top-0 bg-black w-[400px] h-[214px] opacity-0 hover:opacity-80">
                {
                    !like ? (
                        <button className="mt-[10px] ml-[10px] " onClick={likeHandler}><FavoriteBorderIcon className=" text-white" /></button>
                    ) : (
                        <button className="mt-[10px] ml-[10px]" onClick={unlikeHandler}><FavoriteIcon className=" text-white" /></button>
                    )
                }
                <h4 className=" text-center relative top-16">{mov.title}</h4>
            </div>
        </div>
    )
}