export async function action({ request }) {
  try {
    const data = await request.json();
    console.log("✅ Review received:", data);

    // You can later store this in a DB, for now just simulate success
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("❌ Error in submit-review route:", err);
    return new Response("Server error", { status: 500 });
  }
}