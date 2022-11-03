import React from 'react';

type SelectItem = { value: any; text: string };

interface SelectDropDownProps {
  items: SelectItem[];
  label: string;
  elementId: string;
  value?: any;
  onChange?: (event: any) => void;
  minWidth?: number;
  maxWidth?: number;
  rounded?: boolean;
}

export const SelectDropDown: React.FC<SelectDropDownProps> = ({
  items,
  label,
  elementId,
  maxWidth,
  minWidth,
  rounded,
  onChange,
  value,
}) => {
  return (
    <></>
    // <Box
    //   sx={{
    //     minWidth: minWidth || 120,
    //     maxWidth: maxWidth || 300,
    //   }}
    // >
    //   <FormControl fullWidth>
    //     <InputLabel id={`${elementId} - label`}>{label}</InputLabel>
    //     <Select
    //       labelId={`${elementId} - label`}
    //       id={elementId}
    //       value={value}
    //       label={label}
    //       onChange={onChange}
    //       IconComponent={KeyboardArrowDownIcon}
    //       className={rounded ? "rounded-full" : "rounded-xl"}
    //     >
    //       {items.map(({ value, text }) => (
    //         <MenuItem key={value} value={`${text}/${value}`}>
    //           {text}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    // </Box>
  );
};

export default SelectDropDown;
