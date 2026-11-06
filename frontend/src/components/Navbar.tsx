import { useLocation, useSearchParams } from "react-router-dom";
import { useAppData } from "../context/AppContext"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {isAuth} = useAppData()
  const currLocation = useLocation()
  const isHomePage = currLocation.pathname ==="/"

  const [searchParams,setSearchParams] = useSearchParams();
  const [search,setSearch] = useState(searchParams.get("search")|| "")

  useEffect(()=>{
    const timer = setTimeout(() => {
      if(search){
        setSearchParams({search})
      }else{
        setSearchParams({})
      }
    }, 400);
    return ()=> clearTimeout(timer)
  },[search]);

  return (
    <div className="w-full shadow-sm ">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
        <Link to={"/"} className="text-2xl font-bold cursor-pointer">
          <span></span>
        </Link>
      </div>

    </div>
  );
}

export default Navbar