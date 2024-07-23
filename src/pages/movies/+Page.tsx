import { Box, Container, Divider, Stack, Typography, useTheme } from "@mui/material";
import { getRandomElements } from "~/utils/utils";
import Carousel from "~/components/root/ui/carousel/Carousel";
import CardItem from "~/components/root/ui/cardItem/CardItem";
import SortSelect from "~/components/root/features/sortSelect/SortSelect";
import PaginationControl from "~/components/root/features/paginationControl/PaginationControl";
import LatestList from "~/components/root/layout/latestList/LatestList";
import { tokens } from "~/utils/theme";
import { Data } from "./+data";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";
import { Movie } from "@prisma/client";

export default function Page() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { urlParsed } = usePageContext();
    const data = useData<Data>();
    const moviesCarouselImages = getRandomElements(data.moviesData.movies, 5);

    const pageCount = Math.ceil(data.moviesData.count / 10);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        urlParsed.search.page = String(value);
    };

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    rowGap: 4,
                    paddingTop: 4,
                }}
                component={"section"}
            >
                <Box mt={4} component={"section"}>
                    <Carousel data={moviesCarouselImages} type="movies" />
                </Box>
                <Stack
                    display="flex"
                    flexDirection="row"
                    justifyContent={"space-between"}
                    alignItems="center"
                    component="section"
                >
                    <Box ml={1}>
                        <Typography fontSize={28} variant="h2">
                            Movies
                        </Typography>
                        <Divider sx={{ borderBottomWidth: 3, background: colors.primary[100], mt: 1 }} />
                    </Box>
                    <Box mr={1}>
                        <SortSelect
                            sortBy={urlParsed.search.sortBy ? urlParsed.search.sortBy : ""}
                            ascOrDesc={urlParsed.search.ascOrDesc ? urlParsed.search.ascOrDesc : ""}
                            onChange={(event) => {
                                // handleChangeSorting("movies", event);
                            }}
                            type="list"
                        />
                    </Box>
                </Stack>
                <Box
                    component={"section"}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        placeItems: "center",
                        placeContent: "center",
                        rowGap: 4,
                    }}
                >
                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        justifyContent={"center"}
                        alignContent={"center"}
                        rowGap={8}
                        columnGap={4}
                    >
                        {data.moviesData.movies.map((movie: Movie) => (
                            <CardItem data={movie} type="movie" key={movie.id} />
                        ))}
                    </Stack>
                    <PaginationControl
                        currentPage={urlParsed.search.page ? Number(urlParsed.search.page) : 1}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                    />
                </Box>
                <Divider sx={{ borderBottomWidth: 3, background: colors.primary[100] }} />
                <LatestList data={data.latestMovies} type="Movies" />
            </Box>
        </Container>
    );
}
