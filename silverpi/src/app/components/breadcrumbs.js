import { Children } from "react";
import { Fragment } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);
  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span><ChevronRightIcon className="text-gray-600 h-4 w-4"></ChevronRightIcon></span>
        </Fragment>
      );
    }
    return child
  });

  return (
    <nav className="flex justify-center mt-5 bg-transparent md:ml-40 md:justify-start ">
      <ol className="flex items-center space-x-3">{childrenWtihSeperator}</ol>
    </nav>
  );
};

export default Breadcrumb;
