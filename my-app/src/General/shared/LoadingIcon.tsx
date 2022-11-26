import React from "react";
import { ColorRing } from "react-loader-spinner";
import "../css-files/loadingIcon.css"

const LoadingIcon = () => {
  return (
    <div className="icon-display">
      <ColorRing
        visible={true}
        height="300"
        width="300"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#75c4e0", "#75c4e0", "#75c4e0", "#75c4e0", "#75c4e0"]}
      />
    </div>
  );
};

export default LoadingIcon;