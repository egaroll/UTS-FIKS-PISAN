import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// Initialize Firebase (replace these config values with your own from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCo3-q7_rSZA_a-so069C_7yNpYaVvL6Zs",
  authDomain: "uts-cv.firebaseapp.com",
  projectId: "uts-cv",
  storageBucket: "uts-cv.firebasestorage.app",
  messagingSenderId: "338902440851",
  appId: "1:338902440851:web:922447ae52100e6e036666",
  measurementId: "G-BFRV25WHVV"
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Kontak({ styles, currentTheme }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null); // ID of comment being deleted

  // Fetch comments when component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  // Fetch comments from Firestore
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const commentsCollection = collection(db, "comments");
      const commentsSnapshot = await getDocs(commentsCollection);

      const commentsData = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort comments by date (newest first)
      commentsData.sort((a, b) => new Date(b.date) - new Date(a.date));

      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerStyle = {
    color: currentTheme.primary,
    borderBottom: `2px solid ${currentTheme.primary}`,
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  const contactCardStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  };

  const contactItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const iconStyle = {
    marginRight: "10px",
    width: "24px",
    textAlign: "center",
  };

  const commentSectionStyle = {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const commentStyle = {
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginBottom: "15px",
    position: "relative",
  };

  const deleteButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    color: "#ff5252",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    transition: "background-color 0.2s",
  };

  const deleteButtonHoverStyle = {
    backgroundColor: "rgba(255, 82, 82, 0.1)",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    width: "100%",
  };

  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: currentTheme.primary,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    opacity: isLoading ? 0.7 : 1,
  };

  const averageRating =
    comments.length > 0
      ? (
          comments.reduce((sum, comment) => sum + comment.rating, 0) /
          comments.length
        ).toFixed(1)
      : 0;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim() && newRating > 0 && name.trim()) {
      setIsLoading(true);
      setSubmitStatus(null);

      try {
        const commentData = {
          name: name.trim(),
          comment: newComment.trim(),
          rating: newRating,
          date: serverTimestamp(), // Use Firestore server timestamp
        };

        // Add comment to Firestore
        const commentsCollection = collection(db, "comments");
        const docRef = await addDoc(commentsCollection, commentData);

        // Get the document ID from Firestore
        const newCommentWithId = {
          id: docRef.id,
          ...commentData,
          date: new Date().toISOString(), // Use local date for immediate display
        };

        // Update state with the new comment
        setComments((prevComments) => [newCommentWithId, ...prevComments]);

        // Reset form
        setNewComment("");
        setNewRating(0);
        setName("");
        setSubmitStatus({
          type: "success",
          message: "Ulasan berhasil ditambahkan!",
        });
      } catch (error) {
        console.error("Error submitting comment:", error);
        setSubmitStatus({
          type: "error",
          message: "Gagal mengirim ulasan. Silakan coba lagi.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteComment = async (id) => {
    // Set loading state for this specific comment
    setDeleteLoading(id);
    setSubmitStatus(null);

    try {
      // Delete comment from Firestore
      const commentRef = doc(db, "comments", id);
      await deleteDoc(commentRef);

      // Update state by removing the deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );

      setSubmitStatus({
        type: "success",
        message: "Ulasan berhasil dihapus!",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      setSubmitStatus({
        type: "error",
        message: "Gagal menghapus ulasan. Silakan coba lagi.",
      });
    } finally {
      setDeleteLoading(null);
    }
  };

  const renderStars = (rating, isInteractive = false) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const starValue = index + 1;
        const filled = isInteractive
          ? starValue <= (hoverRating || newRating)
          : starValue <= rating;

        return (
          <span
            key={index}
            style={{
              cursor: isInteractive ? "pointer" : "default",
              color: filled ? "#FFD700" : "#ddd",
              fontSize: "24px",
              marginRight: "5px",
            }}
            onClick={isInteractive ? () => setNewRating(starValue) : undefined}
            onMouseEnter={
              isInteractive ? () => setHoverRating(starValue) : undefined
            }
            onMouseLeave={isInteractive ? () => setHoverRating(0) : undefined}
          >
            ★
          </span>
        );
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={styles.section}
    >
      <motion.h2
        style={headerStyle}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Kontak
      </motion.h2>

      <motion.div
        style={contactCardStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          style={contactItemStyle}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span style={iconStyle}>✉️</span>
          <p>
            <strong>Email:</strong> helgapuspa7@gmail.com
          </p>
        </motion.div>

        <motion.div
          style={contactItemStyle}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span style={iconStyle}>🔗</span>
          <p>
            <strong>Instagram:</strong> instragram.com/egarolll
          </p>
        </motion.div>

        <motion.div
          style={contactItemStyle}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span style={iconStyle}>💻</span>
          <p>
            <strong>GitHub:</strong> github.com/egaroll
          </p>
        </motion.div>

        <motion.div
          style={contactItemStyle}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span style={iconStyle}>📱</span>
          <p>
            <strong>Telepon:</strong> +62 851 8341 8645
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        style={commentSectionStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.h3
          style={{ marginBottom: "15px", color: currentTheme.primary }}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Ulasan dan Rating
        </motion.h3>

        {comments.length > 0 && (
          <motion.div
            style={{ marginBottom: "20px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ margin: 0, marginRight: "10px" }}>
                Rating Rata-rata: {averageRating}
              </h4>
              {renderStars(parseFloat(averageRating))}
              <span style={{ marginLeft: "10px", color: "#666" }}>
                ({comments.length} ulasan)
              </span>
            </div>

            <h4 style={{ marginBottom: "10px" }}>Semua Ulasan:</h4>
            {comments.map((comment) => (
              <div key={comment.id} style={commentStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <strong>{comment.name}</strong>
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    {comment.date instanceof Date
                      ? comment.date.toLocaleDateString()
                      : new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <div>{renderStars(comment.rating)}</div>
                <p style={{ margin: "10px 0 0 0" }}>{comment.comment}</p>

                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  style={{
                    ...deleteButtonStyle,
                    ...(deleteLoading === comment.id
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}),
                  }}
                  disabled={deleteLoading === comment.id}
                  title="Hapus ulasan"
                  onMouseOver={(e) => {
                    if (deleteLoading !== comment.id) {
                      Object.assign(
                        e.currentTarget.style,
                        deleteButtonHoverStyle
                      );
                    }
                  }}
                  onMouseOut={(e) => {
                    if (deleteLoading !== comment.id) {
                      // Remove the hover styles
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {deleteLoading === comment.id ? (
                    <span>⏳</span> // Loading indicator
                  ) : (
                    <span>🗑️</span> // Delete icon
                  )}
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {isLoading && comments.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Memuat ulasan...
          </div>
        )}

        {!isLoading && comments.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            Belum ada ulasan. Jadilah yang pertama memberikan ulasan!
          </div>
        )}

        {submitStatus && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              backgroundColor:
                submitStatus.type === "success" ? "#e6f7e6" : "#ffebeb",
              color: submitStatus.type === "success" ? "#2e7d32" : "#c62828",
            }}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleCommentSubmit}>
          <motion.h4
            style={{ marginBottom: "10px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            Tambahkan Ulasan Anda:
          </motion.h4>

          <input
            type="text"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
            disabled={isLoading}
          />

          <div style={{ marginBottom: "15px" }}>
            <p style={{ marginBottom: "5px" }}>Rating Anda:</p>
            <div>{renderStars(newRating, !isLoading)}</div>
          </div>

          <textarea
            placeholder="Tulis komentar Anda..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
            required
            disabled={isLoading}
          ></textarea>

          <button
            type="submit"
            style={buttonStyle}
            disabled={
              !newComment.trim() || !newRating || !name.trim() || isLoading
            }
          >
            {isLoading ? "Mengirim..." : "Kirim Ulasan"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
