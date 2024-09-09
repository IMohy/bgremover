import Header from "../Header";
type LayoutProps = {
    children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <main className="flex-grow mt-16 p-4">{children}</main>
        </div>
    );
};

export default Layout;
