document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("revu-app-review-widget");
  if (!container) return;

  const productId = container.getAttribute("data-product-id");

  container.innerHTML = `
    <style>
      #revu-form {
        border: 1px solid #ddd;
        padding: 16px;
        max-width: 500px;
        font-family: sans-serif;
      }

      #revu-form h4 {
        margin-bottom: 12px;
        font-size: 18px;
      }

      #revu-form textarea {
        width: 100%;
        min-height: 80px;
        padding: 8px;
        margin-bottom: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      #revu-form select,
      #revu-form button {
        padding: 8px;
        margin-top: 8px;
        font-size: 14px;
      }

      #revu-form .success-msg {
        color: green;
        margin-top: 10px;
      }
    </style>

    <form id="revu-form">
      <h4>Leave a Review</h4>
      <label for="rating">Rating:</label>
      <select id="rating" required>
        <option value="">Select</option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>
      <br><br>
      <textarea id="comment" placeholder="Write your review..." required></textarea>
      <br>
      <button type="submit">Submit Review</button>
      <div class="success-msg" id="successMsg" style="display:none;">Thank you! ✅</div>
    </form>
  `;

  // Handle form submission
  const form = document.getElementById("revu-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    const response = await fetch("https://shopify-plugin-coral.vercel.app/submit-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, comment })
    });

    if (response.ok) {
      document.getElementById("successMsg").style.display = "block";
      form.reset();
      const submittedReview = document.createElement("div");
submittedReview.style.marginTop = "12px";
submittedReview.innerHTML = `
  <strong>Your Review:</strong><br>
  Rating: ${rating} ⭐<br>
  Comment: ${comment}
`;
form.parentNode.appendChild(submittedReview);
    } else {
      alert("Error submitting review.");
    }
  });
});