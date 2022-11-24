import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import "./css-files/App.css";
import Main from "./Main";
import { useSelector } from "react-redux";

const App = () => {
  const loadingMode = useSelector((state: any) => state.loadingData.value);

  return (
    <div className="container">
     
      {loadingMode && (
        <div className="icon-display">
          <ColorRing
            visible={true}
            height="300"
            width="300"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#34eb98", "#34eb98", "34eb98", "#75c4e0", "#75c4e0"]}
          />
        </div>
      )}
      <Main></Main>
      
    </div>
  );
};

export default App;
