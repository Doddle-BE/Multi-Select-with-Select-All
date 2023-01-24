import { Box } from "@mui/material";
import { MultiSelect } from "./MultiSelect";

function App() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "25%",
      }}
    >
      <MultiSelect
        initSelectedList={[{ value: "3", label: "East" }]}
        data={[
          { value: "1", label: "North" },
          { value: "2", label: "South" },
          { value: "3", label: "East" },
          { value: "4", label: "West" },
        ]}
      />
    </Box>
  );
}

export default App;
