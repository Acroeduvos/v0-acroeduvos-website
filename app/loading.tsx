export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-16 w-16">
          <div className="absolute top-0 h-16 w-16 animate-ping rounded-full bg-gray-200 opacity-75"></div>
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  )
}
