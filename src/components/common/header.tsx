import { FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";

const Header = () => {
  const isLoggedIn = false;
  return (
    <header>
      <nav className="container flex items-center justify-between py-4 lg:px-6 px-2 mx-auto">
        <div className="flex lg:flex-1">
          <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
            <FileText className="size-5 lg:size-8 text-gray-900 hover:rotate-12 transform transition duration-200" />
            <span className="font-extrabold lg:text-xl text-gray-900">
              Sarmormo
            </span>
          </NavLink>
        </div>

        <div className="flex lg:justify-between gap-4 lg:gap-12 lg:items-center">
          <NavLink href={"/#pricing"}>Pricing</NavLink>
          {isLoggedIn && <NavLink href={"/dashboard"}>Dashboard</NavLink>}
        </div>

        <div className="flex lg:justify-end lg:flex-1">
          {isLoggedIn ? (
            <div className="flex gap-2 items-center">
              <NavLink href="/upload">Upload a PDF</NavLink>
              <div>Pro</div>
              <Button>User</Button>
            </div>
          ) : (
            <div>
              <NavLink href={"/sign-in"}>Sign In</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
