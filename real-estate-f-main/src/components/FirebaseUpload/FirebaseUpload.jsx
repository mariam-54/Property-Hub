import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  CardContent,
  Card,
  Container,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FirebaseUpload = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImages([...e.target.files]);  // Save the selected files
    }
  };

  const handleUpload = () => {
    if (images.length === 0) return;

    setUploading(true);
    const progressArray = new Array(images.length).fill(0);  // Initialize progress array for each file
    const promises = [];

    images.forEach((image, index) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      promises.push(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              progressArray[index] = progress;
              setUploadProgress([...progressArray]);  // Update individual file progress
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setImageUrls((prevUrls) => [...prevUrls, downloadURL]);
              resolve(downloadURL);
            }
          );
        })
      );
    });

    // Wait for all uploads to finish
    Promise.all(promises)
      .then(() => {
        setUploading(false);
        setUploadProgress([]);
        console.log("All images uploaded");
      })
      .catch((err) => {
        console.error("Error uploading files:", err);
        setUploading(false);
      });
  };

  return (
    <Container minwidth="sm" sx={{ py: 12 }}>
      <Box sx={{ textAlign: "center" }}>
        <Card
          sx={{
            border: "1px solid var(--Secondary-2)",
            borderRadius: "25px",
          }}
        >
          <CardContent className="upload-card-content">
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon sx={{ color: "#fff" }} />}
              className="upload-btn"
              sx={{ color: "#fff", background:"var(--Primary)" }}
            >
              Choose Images
              <input
                type="file"
                hidden
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />
            </Button>

            {/* {images.length > 0 && (
              <Typography variant="subtitle1" gutterBottom>
                Selected files: {images.map((image) => image.name).join(", ")}
              </Typography>
            )} */}

            <Button
              variant="contained"
              sx={{background:"var(--Secondary-1)", color:"var(--White)"}}
              onClick={handleUpload}
              disabled={images.length === 0 || uploading}
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </Button>

            {uploading && (
              <Box sx={{ mt: 2 }}>
                {uploadProgress.map((progress, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography>Uploading {images[index].name} - {progress}%</Typography>
                    <CircularProgress variant="determinate" value={progress} />
                  </Box>
                ))}
              </Box>
            )}

            {/* Image previews after upload */}
            {imageUrls.length > 0 && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {imageUrls.map((url, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <img src={url} alt={`Uploaded ${index + 1}`} style={{ width: "100%", height: "auto" }} />
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default FirebaseUpload;