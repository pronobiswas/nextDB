"use client"; // must be a client component

export default function Error({ error, reset }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-red-600 text-xl font-bold">Something went wrong 😔</h2>
      <p>{error.message}</p>

      <button
        onClick={() => reset()} // reset re-renders the route
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}
