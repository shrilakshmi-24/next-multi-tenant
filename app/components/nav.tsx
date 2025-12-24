"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

function Nav() {
  return (
    <>
     
        <nav className="p-4 justify-between flex items-center">
          <div >
            <h2 className="text-2xl font-bold bg-red-100" >Welcome to my Blog!</h2></div>
          <div className="flex gap-2 justify-center items-center">
            <OrganizationSwitcher  afterSelectOrganizationUrl='/org/:slug'/>
             <UserButton />
          </div>
         
        </nav>
     
      <div></div>
    </>
  );
}

export default Nav;
