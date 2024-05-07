"use client";
import { Login } from "@/lib/routes";
import { useRouter } from "next/navigation";


interface LoginButtonProps {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

const LoginButton = ({children, mode = 'redirect', asChild}: LoginButtonProps) => {
    const router = useRouter();
    //NOTE: router vs links vs redirect 
    const onClick = () => {
        console.log("LOGIN BUTTON CLICKED");
        router.push(Login.href);
    }

    if (mode === "modal") {
        return (
            <span>
                TODO: Implement modal
            </span>
        )
    }
  
    return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}

export default LoginButton
