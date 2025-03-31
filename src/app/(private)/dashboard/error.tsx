'use client';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center mt-10">
      <h2 className="text-red-500 text-xl">⚠️ Oops! Something went wrong.</h2>
      <p className="text-gray-600">{error.message}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
