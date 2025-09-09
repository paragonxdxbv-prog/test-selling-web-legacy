// @ts-nocheck
"use client";
import { NavbarLink, NavbarLinkBackground } from "./link";

export const Header = () => {
  const links = [
    { href: "/", title: "Home" },
    { href: "/store", title: "Store" },
    { href: "/about", title: "About" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <a href="/" className="flex items-center gap-2 select-none">
        <img
          src="/legacy-logo.png"
          alt="Legacy logo"
          width={28}
          height={28}
          className="rounded-sm"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            if (target.src.indexOf("placeholder-logo.png") === -1) {
              target.src = "/placeholder-logo.png"
            }
          }}
        />
        <span className="text-base font-semibold tracking-tight">Legacy</span>
      </a>
      <nav className="bg-slate-1 rounded-full">
        <div className="bg-slate-1 rounded-full p-1 flex relative items-center shadow-[0px_-1px_3px_0px_rgba(0,_0,_0,_0.05),_0px_7px_2px_0px_rgba(0,_0,_0,_0.02),_0px_4px_2px_0px_rgba(0,_0,_0,_0.05),_0px_2px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(0,_0,_0,_0.03),_0px_0px_1px_0px_rgba(0,_0,_0,_0.04)] dark:shadow-[0px_-1px_3px_0px_rgba(0,_0,_0,_0.03),_0px_7px_2px_0px_rgba(0,_0,_0,_0.03),_0px_4px_2px_0px_rgba(0,_0,_0,_0.05),_0px_2px_1px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(0,_0,_0,_0.1),_0px_0px_1px_0px_rgba(0,_0,_0,_0.1)]">
          <NavbarLinkBackground links={links.map((l) => l.href)} />
          {links.map(({ href, title }) => (
            <NavbarLink href={href}>
              {title}
            </NavbarLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
