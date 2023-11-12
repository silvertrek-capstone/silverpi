"use client"
import { useRouter, usePathname, useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumb from "../components/breadcrumbs.js";
import BreadcrumbItem from "../components/breadcrumbitem.js";

export default function BreadcrumbGenerator () {
    const [breadcrumbs, setBreadcrumbs] = useState();
    var pathName = usePathname()

    useEffect(() => {
      let pathArray =  pathName.split("/");
      if(pathArray.length <= 2) {
        var breadcrumbs = []
        setBreadcrumbs(breadcrumbs);
      } else {
        pathArray.shift();

        pathArray = pathArray.filter((path) => path !== "");

        const breadcrumbs = pathArray.map((path, index) => {
        const href = "/" + pathArray.slice(0, index + 1).join("/");
        return {
            href,
            label: path.charAt(0).toUpperCase() + path.slice(1),
        };
        });
        setBreadcrumbs(breadcrumbs);
      }
      
    }, [pathName]);

    return (
        <Breadcrumb>
            {
            breadcrumbs &&
            breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
                <span className = "text-gray-700 text-lg hover:font-medium hover:underline">{breadcrumb.label}</span>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )

}