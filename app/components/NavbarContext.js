"use client";

import React, { createContext, useContext } from "react";

const NavbarContext = createContext(false);

export function NavbarProvider({ children }) {
  return (
    <NavbarContext.Provider value={true}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  return useContext(NavbarContext);
}
