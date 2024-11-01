import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import './FilterTabs.css';

const FilterTabs = ({ setFilteredResults }) => {
  const [propertyFilter, setPropertyFilter] = useState("all");
  const dispatch = useDispatch();
  const { states } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let filtered;
    if (propertyFilter === "all") {
      filtered = states;
    } else {
      filtered = states.filter((item) => item.property === propertyFilter);
    }
    setFilteredResults(filtered);
  }, [propertyFilter, states, setFilteredResults]);


  return (
    <>
    <Box sx={{ display: "flex", gap: 2, justifyContent:"center" }}>

      <Button className="btn-filter-style" onClick={() => setPropertyFilter("all")}>All</Button>
      <Button className="btn-filter-style" onClick={() => setPropertyFilter("apartment")}>Apartment</Button>
      <Button className="btn-filter-style" onClick={() => setPropertyFilter("house")}>House</Button>
      <Button className="btn-filter-style" onClick={() => setPropertyFilter("villa")}>Villa</Button>
      <Button className="btn-filter-style" onClick={() => setPropertyFilter("studio")}>Studio</Button>

    </Box>

    </>

    
  );
};

export default FilterTabs;