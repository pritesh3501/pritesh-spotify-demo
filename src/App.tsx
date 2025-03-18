import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
import AppRoutes from "./Routes/AppRoutes.tsx";
import AuthRoutes from "./Routes/AuthRoutes.tsx";
import { useSelector } from "react-redux";
import { ReduxProps } from "./utils/constant.ts";
import { useEffect, useState } from "react";

const App = () => {
  const reduxData = useSelector((state: ReduxProps) => state.global);
  const [isAuthonticate, setIsAuthonticate] = useState<boolean>(false);
  useEffect(() => {
    setIsAuthonticate(!!localStorage.authData);
  }, [reduxData]);
  return (
    <Container maxWidth={isAuthonticate ? "lg" : "sm"}>
      {isAuthonticate ? <AppRoutes /> : <AuthRoutes />}
    </Container>
  );
};

export default App;
