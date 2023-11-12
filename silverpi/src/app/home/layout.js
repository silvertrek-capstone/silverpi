import Navbar from "../components/navbar.js"

export default function DashboardLayout({ children }) {
    return (
        <>
            <Navbar />
            <section>{children}</section>
        </>
    );
  }