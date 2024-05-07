import { poppins } from "@/styles/fonts";
import { cn } from "@/lib/utils"


interface AuthHeaderProps {
    label: string,
  }
  
  const AuthHeader = ({label}: AuthHeaderProps) => { 
    return (
      <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
        <h1 className={cn('text-2xl font-semibold', poppins.className)}>Auth</h1>
        <p className='text-muted-foreground text-sm'>{label}</p>
      </div>
    )
  }
  
  export default AuthHeader;