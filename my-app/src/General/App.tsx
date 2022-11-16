import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import "./css-files/App.css";
import Main from "./Main";
import { useSelector } from "react-redux";
import PaginationCopy from "./Utils/PaginationCopy";

const App = () => {
  const loadingMode = useSelector((state: any) => state.loadingData.value);
  const [number, setNumber] = useState(1);
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
      <PaginationCopy
        postsPerPage={10}
        totalPosts={300}
        setCurrentPage={setNumber}
        currentPage={number}
      ></PaginationCopy>
    </div>
  );
};

export default App;
