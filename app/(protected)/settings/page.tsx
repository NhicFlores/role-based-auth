import { auth } from '@/auth'

const SettingsPage = async () => {
    const session = await auth();
  return (
    <div>
        Settings Page
        <div>
            {JSON.stringify(session)}
        </div>
    </div>
  )
}

export default SettingsPage
