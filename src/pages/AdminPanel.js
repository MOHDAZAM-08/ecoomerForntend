import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])

  return (
    <div className=' md:flex hidden'>

        <aside className='bg-gray-800 text-white h-[89.8vh] min-h-full  w-full  max-w-60 customShadow'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                        user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser/>
                        )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4 gap-4'>
                        <Link to={"all-users"} className='text-center p-2 text-md border-b border-l border-r rounded-lg hover:bg-slate-100 hover:text-black'>All Users</Link>
                        <Link to={"all-products"} className='text-center text-md p-2 rounded-lg border-l border-r  border-b hover:bg-slate-100 hover:text-black'>All product</Link>
                         <Link to={"all-Orders"} className='text-center text-md p-2 rounded-lg border-l border-r  border-b hover:bg-slate-100 hover:text-black'>All Orders</Link>
                        <Link to={"Complete-Orders"} className='text-center text-md p-2 rounded-lg border-l border-r  border-b hover:bg-slate-100 hover:text-black'>Delivered Orders</Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel