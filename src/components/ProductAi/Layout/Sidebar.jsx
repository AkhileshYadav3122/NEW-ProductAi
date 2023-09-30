import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  const sidebarData = [
    // {
    //   title: "All Products",
    //   icon: "bi bi-grid",
    //   link: "/admin/dashboard",
    // },

    // {
    //   title: "Text Translation",
    //   icon: "bi bi-translate",
    //   link: "/admin/home",
    // },
    {
      title: "Translation",
      icon: "bi bi-translate",
      subItems: [
        {
          title: "Text Translation",
          icon: "bi bi-circle",
          link: "/admin/home",
        },
        {
          title: "Documents Translation",
          icon: "bi bi-circle",
          link: "/admin/DocumentTranslate",
        },
      ],
    },
    {
      title: "Summarization",
      icon: "bi bi-file-earmark-font",
      subItems: [
        {
          title: "Abstract",
          icon: "bi bi-circle",
          link: "/admin/Abstract",
        },
        {
          title: "Extract Text",
          icon: "bi bi-circle",
          link: "/admin/Extract",
        },
      ],
    },

    {
      title: "Lipi",
      icon: "bi bi-boxes",
      subItems: [
        {
          title: "Aadhar",
          icon: "bi bi-circle",
          link: "/admin/dashboard",
        },
        {
          title: "Passport",
          icon: "bi bi-circle",
          link: "/admin/dashboard",
        },
        {
          title: "Driving License",
          icon: "bi bi-circle",
          link: "/admin/dashboard",
        },
        {
          title: "Pan Card",
          icon: "bi bi-circle",
          link: "/admin/dashboard",
        },
        {
          title: "Doc Scan",
          icon: "bi bi-circle",
          link: "/admin/dashboard",
        },
        {
          title: "Cheque Extraction",
          icon: "bi bi-circle",
          link: "/admin/dashboard",
        },
      ],
    },

    {
      title: "Write With Ai",
      icon: "bi bi-envelope",
      link: "WriteWithAi",
    },
    // {
    //   title: "Speech ",
    //   icon: "bi bi-mic",
    //   link: "speech ",
    // },

    {
      title: "Assets",
      icon: "bi bi-dash-circle",
      link: "Assets",
    },
  ];

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {sidebarData.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </ul>
    </aside>
  );
};

const SidebarItem = ({ item }) => {
  const { title, icon, link, subItems } = item;
  const [isOpen, setIsOpen] = React.useState(false);

  if (subItems) {
    return (
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-bs-toggle="collapse"
          data-bs-target={`#components-nav-${title.replace(/\s+/g, "-")}`}
          aria-expanded="false"
        >
          <i className={icon}></i>
          <span>{title}</span>
          <i
            className={`bi bi-chevron-down ms-auto ${isOpen ? "rotate" : ""}`}
            style={{ marginLeft: "25%" }}
          ></i>
        </Link>
        <ul
          id={`components-nav-${title.replace(/\s+/g, "-")}`}
          className="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          {subItems.map((subItem, index) => (
            <li key={index}>
              <Link to={subItem.link}>
                <i className={subItem.icon}></i>
                <span>{subItem.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <Link className="nav-link" to={link}>
        <i className={icon}></i>
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
