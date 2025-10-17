import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: "*", 
});

// Helper to run middleware in Next.js
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function corsMiddleware(req, res) {
  await runMiddleware(req, res, cors);
}
