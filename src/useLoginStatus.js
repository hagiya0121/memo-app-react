import { useContext } from "react";
import { loginContext } from "./loginContext";

export function useLoginStatus() {
  const isLogin = useContext(loginContext);

  return isLogin;
}
