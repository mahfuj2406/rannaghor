import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import './Header.css'
import ActiveLink from '../ActiveLink';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }
    return (
        <div>
            <nav className="bg-purple-900">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex items-center sm:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button type="button" className="inline-flex items-center justify-center rounded p-2 text-white hover:outline-double focus:outline-double " aria-controls="mobile-menu" aria-expanded="false">
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 justify-center sm:items-stretch sm:justify-between mr-20">
                            <h1 className="flex text-white items-center"><Link to='/' className='border p-2'>Ranna Ghor</Link>
                            </h1>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <ActiveLink to="/" className="" >Home</ActiveLink>
                                    {/* <Link to="/recipe" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Recipe</Link> */}
                                    <ActiveLink to="/blogs" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Blog</ActiveLink>

                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {
                                user ?
                                    <>
                                        <button onClick={handleLogOut} className="rounded p-2 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">Log Out</button>
                                    </> :
                                    <Link to="/login" className="rounded p-2 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">Login </Link>
                            }


                            {/* <!-- Profile and login log out section --> */}
                            {
                                user && <div className="relative ml-3" title={user && `${user.displayName}`}>
                                    <div className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        {
                                            user.photoURL ?
                                            <img className="h-8 w-8 rounded-full" src={`${user.photoURL}`} alt="" /> :
                                            <UserCircleIcon className="h-6 w-6 text-blue-500" />
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {/* <!-- Mobile menu, show/hide based on menu state. -->/// */}
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <ActiveLink to="/" className="">Home</ActiveLink>
                        <ActiveLink to="/blogs" className="">Blog</ActiveLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;