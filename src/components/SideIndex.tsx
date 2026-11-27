"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "top", no: "00", label: "giorgi" },
  { id: "shipped", no: "01", label: "in the field" },
  { id: "built", no: "02", label: "how this was built" },
  { id: "report", no: "03", label: "field report" },
  { id: "why", no: "04", label: "why FDE" },
  { id: "life", no: "05", label: "life" },
  { id: "contact", no: "06", label: "contact" },
];

export default function SideIndex() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of ITEMS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="side">
      <nav aria-label="Sections">
        <ul className="index">
          {ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={active === item.id ? "on" : undefined}
                aria-current={active === item.id ? "location" : undefined}
              >
                <span aria-hidden="true">{item.no}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
