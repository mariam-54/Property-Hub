import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  CardContent,
  Card,
  Container,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ProfileImage = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // const handleUpload = () => {
  //   if (!image) return;

  //   const storageRef = ref(storage, `images/${image.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, image);

  //   setUploading(true);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setUploadProgress(progress);
  //     },
  //     (error) => {
  //       console.error(error);
  //       setUploading(false);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         setImageUrl(url);
  //         setUploading(false);
  //         setUploadProgress(0);
  //       });
  //     }
  //   );
  // };

  const handleUpload = () => {
    if (!image) return;
  
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
  
    setUploading(true);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        console.error(error);
        setUploading(false);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(url); // Save URL to state
          setUploading(false);
          setUploadProgress(0);
  
          // Send image URL to backend to save in database
          await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: url }), // Send image URL in the body
          });
  
          alert("Profile image updated successfully!");
        } catch (error) {
          console.error("Failed to save profile image", error);
        }
      }
    );
  };
  
  return (
    <Container  sx={{ paddingBottom: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Card
          sx={{
            border: "1px solid var(--Secondary-2)",
            borderRadius: "25px",
          }}
        >
          <CardContent className="upload-card-content">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="borderRadius"
              height={"120px"}
              width={"120px"}
              />
            ) : (
              <ImageIcon
                sx={{ fontSize: "80px", color: "var(--Secondary-2)" }}
              />
            )}

            {!imageUrl && (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon sx={{ color: "#fff" }} />}
                className="upload-btn"
                sx={{ color: "#fff" }}
              >
                Choose Image
                <input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Button>
            )}

            {/* {image && (
              <Typography variant="subtitle1" gutterBottom>
                Selected file: {image.name}
              </Typography>
            )} */}

            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!image || uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>

            {uploading && (
              <Box sx={{ mt: 2 }}>
                <CircularProgress
                  variant="determinate"
                  value={uploadProgress}
                />
                <Typography>{uploadProgress}%</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProfileImage;