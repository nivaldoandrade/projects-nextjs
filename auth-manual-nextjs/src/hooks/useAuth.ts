import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function useAuth() {
  const contextValue = useContext(AuthContext);

  if(!contextValue) {
    throw Error('UseAuth must be used inside an AuhtContext');
  }

  return contextValue;
}
