function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">LiveTrackings</h1>
        <p className="text-gray-600 mb-6">Track Any Package, Anywhere, Instantly</p>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter tracking number..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Track Package
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
