import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Movies from "../components/MoviesList/Movies";

export default function Home() {
    return (
        <>
            <header>
                <Header />
                <Movies uId="1" name="UpComing" reqPath="https://api.themoviedb.org/3/movie/upcoming?api_key=8eb990dfd79065b302712d80f8daa38e&language=en-US&page=1" />
                <Movies uId="2" name="Popular" reqPath="https://api.themoviedb.org/3/movie/popular?api_key=8eb990dfd79065b302712d80f8daa38e&language=en-US&page=1" />
                <Movies uId="3" name="Trending" reqPath="https://api.themoviedb.org/3/trending/movie/day?api_key=8eb990dfd79065b302712d80f8daa38e&language=en-USpage=2" />
                <Movies uId="4" name="TopRated" reqPath="https://api.themoviedb.org/3/movie/top_rated?api_key=8eb990dfd79065b302712d80f8daa38e&language=en-US&page=1" />
            </header>
            <Footer />
        </>
    )
}