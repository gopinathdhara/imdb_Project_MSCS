import { Link } from "react-router-dom";
import Banner from "./Banner";
import Movies from "./Movies";

function Home({ watchList, setWatchList }) {
  return (
    <>
      <Banner />
      <Movies  watchList={watchList} setWatchList={setWatchList} />
    </>
  );
}

export default Home;
