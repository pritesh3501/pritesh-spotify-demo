import { FormControl, TextField, SxProps } from "@mui/material";
import { FC } from "react";

interface TextInputProps {
  sx?: SxProps;
  type?: string;
  id?: string;
  label?: string;
  helperText?: string;
  value?: string;
  multiline?: boolean;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({
  sx,
  type,
  id,
  label,
  helperText,
  value,
  onChange,
  multiline,
  rows,
}) => {
  return (
    <FormControl fullWidth sx={sx}>
      <TextField
        id={id}
        label={label}
        type={type || "text"}
        variant="outlined"
        size="small"
        error={helperText ? true : false}
        helperText={helperText}
        value={value}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
      />
    </FormControl>
  );
};

export default TextInput;
