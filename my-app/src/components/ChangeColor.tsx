import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../features/Teme";

function ChangeColor() {
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="app">
      <input
        type="text"
        onChange={(event: any) => {
          setColor(event.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          dispatch(changeColor(color));
        }}
      >
        CHANGE COLOR
      </button>
    </div>
  );
}

export default ChangeColor;
