// File: pages/api/comments.js

export default async function handler(req, res) {
    // Handle GET request - retrieve all comments
    if (req.method === "GET") {
      try {
        // In Next.js API routes, we don't have access to browser's localStorage
        // So we'll simulate persistence with a JSON file or use Next.js cache
        
        // For simplicity in this example, we'll return mock data
        // In production, you would use a file-based approach (fs module)
        const commentsData = global.comments || [];
        
        return res.status(200).json({
          success: true,
          comments: commentsData,
        });
      } catch (err) {
        console.error("Error retrieving comments:", err);
        return res.status(500).json({
          success: false,
          error: "Failed to fetch comments",
        });
      }
    }
  
    // Handle POST request - add a new comment
    else if (req.method === "POST") {
      try {
        const { name, comment, rating, date } = req.body;
  
        // Validate input
        if (!name || !comment || !rating || !date) {
          return res.status(400).json({
            success: false,
            error: "Missing required fields",
          });
        }
  
        // Get current comments
        const comments = global.comments || [];
        
        // Create a new comment with ID
        const newComment = {
          id: Date.now().toString(), // Simple ID generation
          name,
          comment,
          rating: Number(rating),
          date,
        };
        
        // Add to comments array
        comments.push(newComment);
        
        // Store in global variable (this is temporary and will reset on server restart)
        global.comments = comments;
  
        return res.status(201).json({
          success: true,
          commentId: newComment.id,
          message: "Comment added successfully",
        });
      } catch (err) {
        console.error("Error adding comment:", err);
        return res.status(500).json({
          success: false,
          error: "Failed to add comment",
        });
      }
    }
  
    // Handle unsupported methods
    else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({
        success: false,
        error: `Method ${req.method} Not Allowed`,
      });
    }
  }