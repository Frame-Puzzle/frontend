import MainNav from "../components/common/MainNav";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-wrap">
      <div className="home-main-content"></div>
      <div className="home-footer"><MainNav /></div>
    </div>
  );
};

export default Home;
