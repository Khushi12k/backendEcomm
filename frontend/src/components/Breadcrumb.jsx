import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="breadcrumb">
      {pathnames.length > 0 ? (
        <Link to="/">Home</Link>
      ) : (
        <span>Home</span>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={index}> / {name.replace("-", " ")}</span>
        ) : (
          <Link key={index} to={routeTo}>
            {" "}
            / {name.replace("-", " ")}
          </Link>
        );
      })}
    </nav>
  );
}
