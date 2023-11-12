import Navbar from "../components/navbar.js"
import BreadcrumbGenerator from "../components/breadcrumbgenerator.js";

export default function DashboardLayout({ children }) {
    return (
        <>
            <Navbar />
            <BreadcrumbGenerator></BreadcrumbGenerator>
            <section>{children}</section>
        </>
    );
  }