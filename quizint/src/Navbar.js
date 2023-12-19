import React from "react";
import { useNavigate } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" onClick={() => navigate(-1)}>
          <span>
            <IoMdArrowRoundBack />
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
