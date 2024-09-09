import Header from "../Header";
type LayoutProps = {
    children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen my-14">
            <Header />
            <main className="flex-grow px-4 py-6 sm:py-8 md:py-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
