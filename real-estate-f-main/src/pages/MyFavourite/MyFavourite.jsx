import { fetchFavorites, removeFavorite } from "../../redux/favoriteSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
  Fade, // Import Fade for animation
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MyPropertiesCard from "../../components/MyPropertiesCard/MyPropertiesCard";

const MyFavourite = () => {
  const dispatch = useDispatch();
  const [visibleItems, setVisibleItems] = useState(1);

  const { states, loading, error } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemoveFavorite = (postId) => {
    dispatch(removeFavorite(postId));
    dispatch(fetchFavorites());
  };

  const handlePageChange = (event, value) => {
    setVisibleItems(value);
  };

  const itemsPerPage = 3;
  const paginatedData = Array.isArray(states)
    ? states.slice(
        (visibleItems - 1) * itemsPerPage,
        visibleItems * itemsPerPage
      )
    : [];

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  }
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{ padding: { xs: 2, md: 4 }, maxWidth: "1200px", margin: "0 auto" }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#21616A",
          textAlign: "left",
        }}
      >
        My Favorites
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "16px", overflow: "hidden" }}
      >
        <Table sx={{ maxWidth: 1 }} aria-label="property table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#E5F4F2",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              <TableCell
                sx={{
                  color: "#21616A",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "16px 24px",
                  borderBottom: "none",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  color: "#21616A",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "16px 24px",
                  borderBottom: "none",
                  textAlign: "right",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <Fade in={true} timeout={500} key={item._id}>
                  <TableRow
                    key={item._id}
                    sx={{
                      transition: "background-color 0.3s ease",
                      "&:hover": { backgroundColor: "#f5f5f5" }, // Hover effect
                    }}
                  >
                    <TableCell sx={{ padding: "16px 24px", width: 1 }}>
                      <MyPropertiesCard item={item} />
                    </TableCell>
                    <TableCell sx={{ padding: "16px", textAlign: "right" }}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleRemoveFavorite(item._id)}
                      >
                        <DeleteIcon
                          sx={{
                            color: "#f44336",
                            "&:hover": {
                              color: "#EFA00F",
                            },
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Fade>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="body1">No favorites found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={
          Array.isArray(states) && states.length > 0
            ? Math.ceil(states.length / itemsPerPage)
            : 0
        }
        page={visibleItems}
        onChange={handlePageChange}
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": {
            borderRadius: "50%",
            border: "1px solid #21616A",
            color: "#21616A",
            "&.Mui-selected": {
              backgroundColor: "#21616A",
              color: "#fff",
            },
          },
        }}
      />
    </Box>
  );
};

export default MyFavourite;
