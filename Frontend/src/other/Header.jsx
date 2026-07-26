import React, { useState } from "react";
import { LogOut, Bell, Zap } from "lucide-react";
import Button from "../components/ui/Button";

const Header = ({ data, changeUser }) => {
  const [notif, setNotif] = useState(3);

  const logOutUser = () => {
    localStorage.removeItem("loggedInUser");
    if (changeUser) changeUser(null);
    else window.location.reload();
  };

  const initials = (data?.name || "AD")
    .split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="flex items-center justify-between px-8 h-[72px] bg-surface/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
      
      {/* ── Left: Logo + greeting ── */}
      <div className="flex items-center gap-5">
        
        {/* Logo mark */}
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm shadow-primary/10">
          <Zap size={20} fill="currentColor" />
        </div>

        <div className="w-[1px] h-8 bg-border" />

        {/* Greeting */}
        <div>
          <p className="text-[11px] text-text-muted font-semibold tracking-wider uppercase mb-0.5">
            {greeting}
          </p>
          <h1 className="text-lg font-extrabold tracking-tight text-text-main">
            {data?.name || "Admin"}
          </h1>
        </div>
      </div>

      {/* ── Right: actions ── */}
      <div className="flex items-center gap-4">
        
        {/* Notification bell */}
        <button
          onClick={() => setNotif(0)}
          className="relative w-10 h-10 rounded-xl bg-surface hover:bg-surface-hover border border-border flex items-center justify-center text-text-muted transition-all duration-200"
        >
          <Bell size={18} />
          {notif > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary border-2 border-surface text-[9px] font-bold text-zinc-950 flex items-center justify-center">
              {notif}
            </span>
          )}
        </button>

        {/* Avatar chip */}
        <div className="flex items-center gap-3 bg-surface border border-border rounded-xl p-1.5 pr-4 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-main leading-none mb-1">
              {(data?.name || "Admin").split(" ")[0]}
            </span>
            <span className="text-[10px] text-text-muted leading-none tracking-wide uppercase">
              {data?.role || "Administrator"}
            </span>
          </div>
        </div>

        <div className="w-[1px] h-7 bg-border" />

        {/* Logout button */}
        <Button variant="ghost" size="icon" onClick={logOutUser} className="text-text-muted hover:text-danger hover:bg-danger/10" title="Logout">
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;