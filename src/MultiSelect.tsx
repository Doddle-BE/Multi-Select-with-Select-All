import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

type OptionsObject = { value: string; label: string };

type MultiSelectProps = {
  data: OptionsObject[];
  initSelectedList?: { value: string; label: string }[];
  onChange?:
    | ((event: SelectChangeEvent<string[]>, child: React.ReactNode) => void)
    | undefined;
};

const callAll =
  (...fns: (Function | undefined)[]) =>
  (...args: unknown[]) =>
    fns.forEach((fn) => fn?.(...args));

const objectInArray = (object: OptionsObject, array: OptionsObject[]) => {
  return array.map((arrayItem) => arrayItem.value).indexOf(object.value) > -1;
};

export const MultiSelect = ({
  data,
  onChange,
  initSelectedList,
}: MultiSelectProps) => {
  const [selectedList, setSelectedList] = React.useState<
    { value: string; label: string }[]
  >(initSelectedList || []);

  const handleChange = (event: SelectChangeEvent<typeof selectedList>) => {
    const {
      target: { value },
    } = event;

    if (value[value.length - 1] === "all") {
      if (value.length - 1 === data.length) {
        setSelectedList([]);
        return;
      }
      setSelectedList([...data]);
      return;
    }

    const valueToAdd = data.filter(
      (item) => item.value === value[value.length - 1]
    )[0];
    if (objectInArray(valueToAdd, selectedList)) {
      setSelectedList(
        selectedList.filter((item) => item.value !== valueToAdd.value)
      );
      return;
    }
    setSelectedList((prev) => [...prev, valueToAdd]);
  };

  return (
    <Select
      multiple
      fullWidth={true}
      value={selectedList}
      onChange={callAll(handleChange, onChange)}
      renderValue={(selected) => selected.map((s) => s.label).join(", ")}
    >
      <MenuItem key={"all"} value={"all"}>
        <Checkbox checked={data.length === selectedList.length} />
        <ListItemText
          primary={
            data.length === selectedList.length ? "Deselect All" : "Select All"
          }
        />
      </MenuItem>
      {data.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          <Checkbox checked={objectInArray(item, selectedList)} />
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Select>
  );
};
