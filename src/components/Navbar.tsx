import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar :React.FC = () => (
    <nav>
        <div className="nav-wrapper px-1 lime">
        <a href="/" className="brand-logo">
        TS-Pet
      </a>
      <ul className="right">
        <li>
            <NavLink to='/smart-form'> Smart form</NavLink>
        </li>
        <li>
            <NavLink to='/dd-func'> Drag & Drop</NavLink>
        </li>
        <li>
            <NavLink to='/tik-tok-page'> TikTok</NavLink>
        </li>
        <li>
            <NavLink to='/gdp'> GDP integration</NavLink>
        </li>
      </ul>
        </div>
    </nav>
)