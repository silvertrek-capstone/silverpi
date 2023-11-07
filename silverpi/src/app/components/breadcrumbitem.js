import Link from "next/link";

const BreadcrumbItem = ({ children, href, ...props }) => {
  return (
    <li {...props}>
      <Link href={href} passHref>
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;