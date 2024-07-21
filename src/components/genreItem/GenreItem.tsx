import { Card, Typography } from "@mui/material";
import { motion } from "framer-motion";
import IGenre from "~/types/IGenre";
import { navigate } from "vike/client/router";

interface IGenreItemProps {
    genre: IGenre;
}

export default function GenreItem({ genre }: IGenreItemProps) {
    return (
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
            <Card
                key={genre.id}
                onClick={async function () {
                    const navigationPromise = navigate(`/genres/${genre.name}`);
                    await navigationPromise;
                    window.scrollTo(0, 0);
                }}
                sx={{
                    display: "flex",
                    placeItems: "center",
                    placeContent: "center",
                    cursor: "pointer",
                    height: "200px",
                    width: "200px",
                    backgroundColor: `colors.secondary`,
                }}
                elevation={4}
            >
                <Typography component={"span"}>{genre.name}</Typography>
            </Card>
        </motion.div>
    );
}
