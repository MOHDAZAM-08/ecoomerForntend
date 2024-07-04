import React, { useContext, useState } from 'react'
import Logo from '../assest/apnidukkan.png'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import { BsCart4 } from "react-icons/bs";

import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }

  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div >
          <Link to="/" className='pl-3 flex items-center gap-3' >
            {/* <img src={Logo} alt="Logo" className="w-full h-10" /> */}
            <div className=''>
              <BsCart4 style={{ scale: "2" }} />
            </div>

            <div className='hidden lg:flex font-semibold text-xl'>ApniBazar</div>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border-2 rounded-full focus-within:shadow p-1 pl-3'>
          <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search} />
          <div className='text-lg min-w-[34px] h-8 mr-.5 bg-gray-800 flex items-center justify-center rounded-full text-white'>
            <GrSearch />
          </div>
        </div>


        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>

            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }


            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN ? (
                    <Link
                      to="/admin-panel/all-products"
                      className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                      onClick={() => setMenuDisplay(prev => !prev)}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <div>
                      <Link
                        to="/order"
                        className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                        onClick={() => setMenuDisplay(prev => !prev)}
                      >
                        Orders
                      </Link>
                      <Link
                        to="/order-history"
                        className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                        onClick={() => setMenuDisplay(prev => !prev)}
                      >
                        Order History
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            )}



          </div>

          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <span><FaShoppingCart /></span>

                <div className='bg-gray-800 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
              </Link>
            )
          }



          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-5 py-2 rounded-lg text-white bg-gray-800 hover:bg-red-700'>Logout</button>
              )
                : (
                  <Link to={"/login"} className='px-5 py-2 rounded-lg text-white bg-gray-800 hover:bg-red-700'>Login</Link>
                )
            }

          </div>

        </div>

      </div>
    </header>
  )
}

export default Header