import {useEffect, useRef, useContext} from 'react';
import logo from "../../assets/images/logo.png"
import { NavLink, Link } from 'react-router-dom';
import userImg from "../../assets/images/avatar-icon.png";
import {BiMenu} from "react-icons/bi";
import { authContext } from '../../context/authContext';
import { USER_IMG_PATH } from '../../config';

const navLinks = [
  {
    name:'/home',
    display:'Home'
  },
  {
    name:'/doctors',
    display:'Find a Doctor'
  },
  {
    name:'/services',
    display:'Services'
  },
  {
    name:'/contact',
    display:'Contact'
  },
]

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const {user, token, role} = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(()=>{
    handleStickyHeader();


    return ()=> window.removeEventListener('scroll', handleStickyHeader);
  })

  const toogleMenu = ()=> menuRef.current.classList.toggle('show__menu')
  return (
    <header className="header flex item-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
            {/* ==========  logo ============ */}
            <div>
              <img src={logo} alt="" />
            </div>
            {/*  ==========  menu ========== */}
            <div className="navigation" ref={menuRef} onClick={toogleMenu}>
              <ul className="menu flex items-center gap-[2.7rem]">
                {
                  navLinks.map((link, index)=>(
                    <NavLink key={index} className={navClass=> navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : 'text-textColor text-[16px] leading-7 font-[6500] hover:text-primaryColor'} to={link.name}>
                      {link.display}
                    </NavLink>
                  ))
                }
              </ul>
            </div>
            <div className="flex items-center gap-4 mt-3">
                {
                  user&&token ?
                    <div>
                      <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
                          <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                            <img src={`${USER_IMG_PATH}/${user.photo}`} className="w-full rounded-full" alt="" />
                          </figure>
                      </Link>
                    </div>
                  :
                    <Link to='/login'>
                      <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">Login</button>
                    </Link>
                }
              <span className="md:hidden" onClick={toogleMenu}>
                <BiMenu className="w-6 h-6 cursor-pointer" />
              </span>
            </div>
            
        </div>
      </div>
    </header>
  )
}

export default Header