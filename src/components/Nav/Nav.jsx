import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">tinkl</h2>
      </Link>
      <div>
        <Link className="navLink" to="/about">
          Info
        </Link>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              About
            </Link>

            <Link className="navLink" to="/info">
              My Profile
            </Link>

            {user.is_admin === true && (
              <>
                <Link className="navLink" to="/admin">
                  Admin Panel
                </Link>
              </>
            )}
          </>
        )}

        <Link className="navLink" to="/bathrooms">
          Bathrooms
        </Link>

        <LogOutButton className="navLink" />
      </div>
    </div>
  );
}

export default Nav;
