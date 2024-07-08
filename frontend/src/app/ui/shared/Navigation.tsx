"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";

function Navigation({ name }: { name: string }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return router.push("/");
  }

  return (
    <div
      className={` 
      } px-[2vw] py-3 fixed left-0 right-0 top-0 h-[72px] z-10 bg-white `}
    >
      <div className="global-container flex items-center">
        <Link href={"/"} className="text-primary font-bold text-[32px] mr-auto">
          Tasky
        </Link>

        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoPersonCircle className="text-primary text-[40px]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex gap-1 hover:bg-slate-100 cursor-pointer"
              >
                <LuLogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div
            className={`${
              name === "authentication" ? "hidden" : ""
            } ml-auto flex items-center `}
          >
            <div className="text-[16px] flex font-bold gap-2 max-md:hidden">
              <Link
                href={"/login"}
                className="py-2 px-4 rounded-md hover:bg-slate-200 hover:text-primary transition-all border-2 border-transparent duration-200"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="bg-primary border-2 border-primary text-white p-2 rounded-md hover:bg-transparent hover:text-primary transition-all duration-200"
              >
                Get started
              </Link>
            </div>

            <div className="hidden max-md:block ml-4 ">
              <button onClick={toggleMenu}>
                <FaBarsStaggered className="text-primary text-[20px]" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 left-0 bg-white rounded-lg shadow-lg py-2 text-center ">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-primary"
                  >
                    Get started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
