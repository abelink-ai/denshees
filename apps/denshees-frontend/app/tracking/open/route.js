const TRACKING_PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64",
);

const PIXEL_HEADERS = {
  "Content-Type": "image/gif",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const backendUrl = (
      process.env.BACKEND_URL || "http://localhost:8100"
    ).replace(/\/$/, "");

    try {
      const headers = {};
      const userAgent = request.headers.get("user-agent");
      const forwardedFor = request.headers.get("x-forwarded-for");
      const realIp = request.headers.get("x-real-ip");
      if (userAgent) headers["user-agent"] = userAgent;
      if (forwardedFor) headers["x-forwarded-for"] = forwardedFor;
      if (realIp) headers["x-real-ip"] = realIp;

      await fetch(
        `${backendUrl}/tracking/open?id=${encodeURIComponent(id)}`,
        { headers, cache: "no-store" },
      );
    } catch (error) {
      console.error("Failed to proxy email open tracking:", error);
    }
  }

  return new Response(TRACKING_PIXEL, {
    status: 200,
    headers: PIXEL_HEADERS,
  });
}
