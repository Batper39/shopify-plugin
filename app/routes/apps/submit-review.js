// app/routes/apps/submit-review.js
export async function loader() {
  // Handle CORS preflight
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export async function action({ request }) {
  try {
    const data = await request.json();
    console.log("✅ Review received:", data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    console.error("❌ Error in submit-review route:", err);
    return new Response("Server error", {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}