import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigator = useNavigate();

  useLayoutEffect(() => {
    navigator("/login");
  });

  return <div>index</div>;
};
