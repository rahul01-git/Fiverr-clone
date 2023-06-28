import { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async ( ) =>{
    try {
      await newRequest.post('/auth/logout')
      localStorage.removeItem('currentUser')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={active || pathname !== "/" ? "active navbar" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && <span>Sign in</span>}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser?.img || '/img/heart.png'}
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add new Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link onClick={handleLogout} className="link">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link to="/" className="link">
              Graphics & Design
            </Link>
            <Link to="/" className="link">
              Video & Animation
            </Link>
            <Link to="/" className="link">
              Writing & Translation
            </Link>
            <Link to="/" className="link">
              All Services
            </Link>
            <Link to="/" className="link">
              Digital Marketing
            </Link>
            <Link to="/" className="link">
              Music & Audio
            </Link>
            <Link to="/" className="link">
              Programming & Tech
            </Link>
            <Link to="/" className="link">
              Business
            </Link>
            <Link to="/" className="link">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
