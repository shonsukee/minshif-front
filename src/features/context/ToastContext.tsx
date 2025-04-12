"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        className={() => "text-sm font-white font-med block p-3 absolute right-0 z-50"}
        limit={3}
      />
    </>
  );
}