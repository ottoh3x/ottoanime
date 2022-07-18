import Card from "./Card";
import { useSelector } from "react-redux";
import PagiNation from "../PagiNation";
import Loader from "../Loader/Loader";
import { clearMyWatchList } from "../../redux/actions/recentlyWatchedAction";
import { AiFillDelete } from "react-icons/ai";



function Container({ Data = [], heading, page, Icon }) {
  const { theme, loading, watchList } = useSelector((state) => state);
  console.log(Data);
  const clearWatch = () => {
    dispatch(clearMyWatchList());
  };
  return loading ? (
    <Loader />
  ) :  Data?.length > 0 ? (
    <>
      <div className="w-10/12 my-5">
        <span
          className={`${theme.text.selected} px-2 flex  font-light items-center  text-3xl`}
        >
          {/* {Icon ? (
            <Icon
              size={15}
              style={{
                margin: "0px 10px 0px 0px",
                color: heading == "My List" ? "red" : theme.text.selected,
              }}
            />
          ) : (
            ""
          )} */}
          {heading}
        </span>
        <div className={`bg-gray-400 rounded-full h-0.5 mx-2 w-[2rem]`} />
        <span className={`text-blue-500  capitalize px-16 font-thin text-xl`}>
          
          {heading == "Showing Results for"
            ? page?.[0]
            : heading == "Genres"
            ? page?.[0]
            : "Anime"}
        </span>
        {heading == "Recently Watched" ? (
          <div className="absolute cursor-pointer px-4 top-0 right-0">
            <div
              className={`${theme.button.background} ${theme.button.text} h-10 w-10  rounded-full flex  p-2.5 shadow-2xl relative right-0`}
              id="deletewatchlist"
              onClick={clearWatch}
            >
              {" "}
              <AiFillDelete size={20} />
            </div>
          </div>
        ) : null}
        
      </div>

      <div className="grid grid-cols-3  w-full px-2 my-6  gap-2  justify-center  md:grid-cols-3 xl:grid-cols-4 lg:px-16 lg:my-16   2xl:grid-cols-6 xl:gap-4">
        {Data?.map((item, index) => (
          <Card {...item} key={index} heading={heading} />
        ))}
      </div>
      {page ? <PagiNation page={page} heading={"Page"} /> : null}
    </>
  ) : (
    <div className={` flex flex-col h-screen  w-full text-lg`}>
      <div
        className={`h-full ${theme.text.notselected} flex flex-col justify-center items-center`}
      >
        <div className="w-full flex  flex-col justify-start items-center">
          <img
            width={400}
            src={theme.theme == "dark" ? "/404dark.svg" : "/404light.svg"}
          />
        </div>
        <span className="py-4">
          Nothing found for&nbsp;
          <span
            className={`${theme.text.selected} capitalize text-xl font-bold`}
          >
            {page?.[0]}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Container;
