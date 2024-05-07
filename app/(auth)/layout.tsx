const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-full flex">
            {children}
        </main>
    )
};

export default AuthLayout;