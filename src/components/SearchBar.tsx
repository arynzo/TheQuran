import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function SearchBar({
  width = "100%",
  placeholder = "Search by name or number",
  onChange,
}: Props) {
  return (
    <TextField
      onChange={onChange}
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      sx={{
        width,
        "& .MuiOutlinedInput-root": {
          borderRadius: 4,
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
