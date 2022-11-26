import "./css-files/App.css";
import Main from "./Main";
import { useSelector } from "react-redux";
import LoadingIcon from "./shared/LoadingIcon";

const App = () => {
  const loadingMode = useSelector((state: any) => state.loadingData.value);

  return (
    <>
      {loadingMode && <LoadingIcon></LoadingIcon>}
      <div className="container">
        <Main></Main>
      </div>
    </>
  );
};

export default App;
