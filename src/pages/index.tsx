import useInitialState from "@/hooks/useInitialState";
import { Navigate } from "react-router-dom";

export default () => {
  const { initialState } = useInitialState();

  return <Navigate to={initialState!.login ? "/home" : "/login"} />;
};
