import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import Footer from "~/components/root/layout/footer/Footer";
import Header from "~/components/root/layout/header/Header";
import Loading from "~/components/root/ui/loading/Loading";
import ScrollToTop from "~/components/root/ui/scrollToTop/scrollToTop";
import { ModalProvider } from "~/contexts/ModalContext";
import { RightPanelProvider } from "~/contexts/RightPanelContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <RightPanelProvider>
            <ModalProvider>
                <Grid container>
                    <Grid item xs={12} paddingTop={8}>
                        <Header />
                        <React.Suspense fallback={<Loading />}>
                            <main>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {children}
                                </motion.div>
                            </main>
                        </React.Suspense>
                        <ScrollToTop />
                        <Footer />
                    </Grid>
                </Grid>
            </ModalProvider>
        </RightPanelProvider>
    );
}
