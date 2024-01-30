export default function NotFound({ query }) {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">No results</h1>
      <p className="text-gray-400">
        Sorry, there are not images for your query: "{query}"
      </p>
      <p className="text-gray-400">Try searching other images!</p>
    </div>
  );
}
