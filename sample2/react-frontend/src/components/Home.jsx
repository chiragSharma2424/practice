import { useNavigate } from 'react-router-dom'

function Home() {
    const Navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-400">
          🎉 Thank You!
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Thank you for sending your credentials and registering on our platform.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              onClick={() => {
                Navigate('/signup');
              }}>
            Sign Up
          </button>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
             onClick={() => {
                Navigate('/signin');
             }}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;