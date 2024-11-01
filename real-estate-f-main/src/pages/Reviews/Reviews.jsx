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
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchReviews, deleteReview } from "../../redux/reviewSlice";

const Reviews = () => {
  const dispatch = useDispatch();
  const [visibleItems, setVisibleItems] = useState(1);

  const { reviews, status, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleDelete = (postId, commentId) => {
    console.log(postId)
    console.log(commentId)
    // dispatch(deleteReview(postId, commentId));
    dispatch(deleteReview({ postId, commentId }));

    dispatch(deleteReview());
    // Dispatch the deleteReview action
    if (!commentId) {
      console.error('Comment ID is undefined');
      return;
    }
    
    // dispatch(deleteReview({ postId, commentId }));
    // dispatch(fetchReviews());
  };

  const handlePageChange = (event, value) => {
    setVisibleItems(value);
  };

  const itemsPerPage = 6;
  const paginatedData = Array.isArray(reviews)
    ? reviews.slice((visibleItems - 1) * itemsPerPage, visibleItems * itemsPerPage)
    : [];

  if (status === "loading") {
    return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: "1200px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        My Reviews
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "16px", overflow: "hidden" }}
      >
        <Table sx={{ maxWidth: 1 }} aria-label="review table">
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
                Property Title
              </TableCell>
              <TableCell
                sx={{
                  color: "#21616A",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "16px 24px",
                }}
              >
                Comment
              </TableCell>
              <TableCell
                sx={{
                  color: "#21616A",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "16px 24px",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: "#21616A",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "16px 24px",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {paginatedData.length > 0 ? (
              paginatedData.map((review, index) => (
                <Fade
                  in={true}
                  key={review.commentId}
                  timeout={(index + 1) * 200} // Timing for the fade effect
                >
                  <TableRow
                    sx={{
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <TableCell sx={{ padding: "16px 24px" }}>
                      {review.postTitle}
                    </TableCell>
                    <TableCell sx={{ padding: "16px 24px" }}>
                      {review.comment}
                    </TableCell>
                    <TableCell sx={{ padding: "16px 24px" }}>
                      {new Date(review.commentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ padding: "16px 24px" }}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(review.postId, review.commentId)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Fade>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="body1">No Reviews Found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={
          Array.isArray(reviews) && reviews.length > 0
            ? Math.ceil(reviews.length / itemsPerPage)
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

export default Reviews;
