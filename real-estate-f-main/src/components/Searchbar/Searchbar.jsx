import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Grid2,
} from "@mui/material";
import { fetchFilteredPosts } from "../../redux/filterProductSlice";

function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
  });

  const { filteredPosts, loading, error } = useSelector(
    (state) => state.filteredPosts
  );

  const handleToggleChange = (event, newType) => {
    setQuery((prev) => ({
      ...prev,
      type: newType || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = async () => {
    setSearchParams(query);
    console.log(query);

    const filter = dispatch(fetchFilteredPosts(query));
    navigate(
      `/properties?type=${query.type}&city=${query.city}&property=${query.property}`
    );

    console.log(filter);
  };

  return (
    <Grid2
      container
      p={4}
      boxShadow={3}
      borderRadius={2}
      sx={{
        Width: 1,
        marginTop: "1em",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#fff" : "#0000006e",
        display: "grid",
        gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(1, 1fr)" },
      }}
    >
      <Box>
        <ToggleButtonGroup
          value={query.type}
          exclusive
          onChange={handleToggleChange}
          fullWidth
        >
          <ToggleButton value="buy">Buy</ToggleButton>
          <ToggleButton value="rent">Rent</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid2
        container
        gap={2}
        sx={{
          Width: 1,
          marginTop: "1em",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#fff" : "#0000006e",
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
        }}
      >
        <Box>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            value={query.city}
          />
        </Box>

        <Box>
          <Select
            name="property"
            fullWidth
            value={query.property}
            onChange={handleChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">Any Property</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
            <MenuItem value="house">House</MenuItem>
            <MenuItem value="villa">Villa</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
          </Select>
        </Box>

        <Button
          variant="contained"
          onClick={handleFilter}
          sx={{
            background: "#EFA00F",
            width: 1,
            color: "#fff",
            padding: "16px 30px",
          }}
        >
          Filter
        </Button>
      </Grid2>
    </Grid2>
  );
}

export default Searchbar;
