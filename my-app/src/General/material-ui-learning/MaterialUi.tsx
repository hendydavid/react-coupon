import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const materialUi = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ageRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    setSelected(ageRef.current!.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      {<div>{selected}</div>}
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Age
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          onChange={(e) => {
            ageRef.current!.value = e.target.value;
            setSelected(ageRef.current!.value)
          }}
          ref={ageRef}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default materialUi;
