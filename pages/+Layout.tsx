import React from "react";
import Link from "../components/Link";
import "./style.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                display: "flex",
                maxWidth: 900,
                margin: "auto",
            }}
        >
            <Sidebar>
                <Link href="/">Welcome</Link>
                <Link href="/movies">Movies list</Link>
            </Sidebar>
            <Content>{children}</Content>
        </div>
    );
}

function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div
            id="sidebar"
            style={{
                padding: 20,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                lineHeight: "1.8em",
                borderRight: "2px solid #eee",
            }}
        >
            {children}
        </div>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div id="page-container">
            <div
                id="page-content"
                style={{
                    padding: 20,
                    paddingBottom: 50,
                    minHeight: "100vh",
                }}
            >
                {children}
            </div>
        </div>
    );
}
