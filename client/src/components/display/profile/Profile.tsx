import { useEffect, useState } from 'react'
import { userService } from '../../../api/services/user.service'
import { useAuth } from '../../AuthProvider'
import './Profile.css'

const Profile = () => {
  const auth = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let subscribed = true
    if (subscribed && auth?.token)
      userService.getProfile().then((data) => {
        auth?.setUser(data)
        setIsLoading(false)
      })
    return () => {
      subscribed = false
    }
  }, [])

  return (
    <section>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="info">
            Email: <span>{auth?.user?.email}</span>
          </p>
          <p className="info">
            Full name: <span>{auth?.user?.fullName}</span>
          </p>
          <p className="info">
            Acess token: <span>{auth?.token}</span>
          </p>
          <div>
            <button
              onClick={auth?.logOut}
              className="px-3 transition-colors hover:bg-red-700 active:bg-opacity-80 py-1.5 text-lg bg-red-600 rounded-[4px]"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Profile
