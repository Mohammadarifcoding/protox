"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <nav className="border-b bg-accent-foreground border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="logo" width={80} height={80} />
          </div>

          <div className="flex items-center gap-4">
            {isPending ? (
              <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 focus:outline-none"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {session.user.name}
                  </span>
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </button>

                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-20">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-border">
                          <p className="text-sm font-medium text-foreground">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.user.email}
                          </p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}