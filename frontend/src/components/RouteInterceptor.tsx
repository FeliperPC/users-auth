import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function RouteInterceptor({children}:{children:JSX.Element}){
  const token = sessionStorage.getItem("token")

  if(!token){
    return <Navigate to={'/unauthorized'} />
  }

  return children
}