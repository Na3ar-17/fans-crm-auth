import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'

function App() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
          },
        }}
      />
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </main>
  )
}

export default App
