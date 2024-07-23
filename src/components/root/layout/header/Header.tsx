import React, { useContext, useEffect, useState } from "react";
import { useStore } from "~/store/store";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    Menu,
    MenuItem,
    Skeleton,
    Stack,
    TextField,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import { ColorModeContext, tokens } from "~/utils/theme";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Clear, Search } from "@mui/icons-material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from "@mui/icons-material/Menu";
// import { useResizeWindow } from "~/hooks/useResizeWindow";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
// import HeaderMobile from "../headerMobile/HeaderMobile";
import { navigate } from "vike/client/router";
import { Genre } from "@prisma/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGenres } from "~/actions/genre.telefunc";
import { usePageContext } from "vike-react/usePageContext";
import { Link } from "../../ui/link/Link";

const Header = (): React.JSX.Element => {
    // #region "State, refs, hooks, theme"
    const [options, setOptions] = useState<any>([]);
    const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
    const [anchorElGenres, setAnchorElGenres] = useState<null | HTMLElement>(null);

    const { user, setUser, isUserLoading, setOpenDrawer } = useStore();
    // const isPageShrunk = useResizeWindow();

    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { urlParsed } = usePageContext();
    // #endregion

    // #region "Event handlers"
    async function handleLogout(): Promise<void> {
        setUser(null);
        closeMenuProfile();
        const navigationPromise = navigate("/");
        await navigationPromise;
    }

    async function redirectToProfile() {
        const navigationPromise = navigate("/profile");
        await navigationPromise;
    }

    const openMenuGenres = (event: React.MouseEvent<HTMLLIElement>) => {
        setAnchorElGenres(event.currentTarget);
    };

    const closeMenuGenres = () => {
        setAnchorElGenres(null);
    };

    const openMenuProfile = (event: any) => {
        setAnchorElProfile(event.currentTarget);
    };

    const closeMenuProfile = () => {
        setAnchorElProfile(null);
    };
    // #endregion

    const genresQuery = useSuspenseQuery({
        queryKey: ["genres"],
        queryFn: () => getGenres({}),
    });

    const genres: Genre[] = genresQuery.data?.rows ?? [];

    useEffect(() => {
        for (const genre of genres) {
            const option = {
                value: genre.name,
                label: genre.name,
            };

            setOptions([...options, option]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     if (isPageShrunk) {
    //         setMobileOpen(true);
    //     } else {
    //         setMobileOpen(false);
    //         setOpenDrawer(false);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isPageShrunk]);

    return (
        <>
            <AppBar position="fixed" component={"header"}>
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        backgroundColor: colors.primary[900],
                        py: 2,
                    }}
                    component={"nav"}
                >
                    <Box>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => {
                                setOpenDrawer(true);
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-around"}
                        columnGap={3}
                        flexWrap={"wrap"}
                    >
                        <Box>
                            <Link href="/">MovieLandia24</Link>
                        </Box>
                        <Box>
                            <List sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
                                <ListItem>
                                    <Link href="/movies">
                                        <MovieIcon fontSize={"large"} />
                                        Movies
                                    </Link>
                                </ListItem>
                                <ListItem
                                    onMouseEnter={openMenuGenres}
                                    onMouseLeave={closeMenuGenres}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <Link href={"/genres"}>
                                        <SubtitlesIcon fontSize={"large"} />
                                        Genres
                                    </Link>
                                    <Menu
                                        anchorEl={anchorElGenres}
                                        open={Boolean(anchorElGenres)}
                                        onClose={closeMenuGenres}
                                        MenuListProps={{
                                            onMouseLeave: closeMenuGenres,
                                            sx: {
                                                display: "grid",
                                                height: "auto",
                                                width: "auto",
                                                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                                padding: 3,
                                            },
                                        }}
                                    >
                                        {genres.map((genre: Genre) => (
                                            <Box
                                                key={genre.id}
                                                onClick={async () => {
                                                    closeMenuGenres();
                                                    const navigationPromise = navigate(`/genres/${genre.name}`);
                                                    await navigationPromise;
                                                }}
                                                sx={{
                                                    cursor: "pointer",
                                                    padding: 1.5,
                                                    textAlign: "center",
                                                    transition: "background-color 0.2s",
                                                    "&:hover": {
                                                        backgroundColor: colors.greenAccent[800],
                                                    },
                                                }}
                                            >
                                                <Typography component={"span"}>{genre.name}</Typography>
                                            </Box>
                                        ))}
                                    </Menu>
                                </ListItem>
                                <ListItem>
                                    <Link href="/series">
                                        <LocalMoviesIcon fontSize={"large"} />
                                        Series
                                    </Link>
                                </ListItem>
                            </List>
                        </Box>
                        <Box sx={{ display: "flex", placeItems: "center", columnGap: 1 }}>
                            <TextField
                                placeholder="What are you going to watch today?"
                                size="small"
                                value={""}
                                onChange={async (e) => {
                                    const value = e.target.value;

                                    if (value.length > 0) {
                                        const navigationPromise = navigate(`/search?term=${value}`);
                                        await navigationPromise;
                                    } else {
                                        const navigationPromise = navigate("/search");
                                        await navigationPromise;
                                    }
                                }}
                                InputProps={{
                                    color: "secondary",
                                    sx: { py: 0.5 },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Clear
                                                sx={{ cursor: "pointer" }}
                                                onClick={async () => {
                                                    if (urlParsed.search.term) {
                                                        const navigationPromise = navigate("/search");
                                                        await navigationPromise;
                                                    }
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <IconButton onClick={colorMode.toggleColorMode}>
                                {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                            </IconButton>
                            {isUserLoading && !user ? (
                                <Skeleton variant="rectangular" width={223} />
                            ) : user && !isUserLoading ? (
                                <Box width={"223px"} display={"flex"} justifyContent={"center"}>
                                    <IconButton
                                        id="buttonProfile"
                                        aria-controls={anchorElProfile ? "menuProfile" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={anchorElProfile ? "true" : undefined}
                                        onClick={openMenuProfile}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "10px",
                                        }}
                                    >
                                        <PersonOutlinedIcon color="action" fontSize="medium" />
                                        <Typography
                                            component={"span"}
                                            style={{
                                                fontSize: 16,
                                            }}
                                        >
                                            {user?.userName}
                                        </Typography>
                                    </IconButton>
                                    <Menu
                                        id="menuProfile"
                                        anchorEl={anchorElProfile}
                                        open={Boolean(anchorElProfile)}
                                        onClose={closeMenuProfile}
                                        MenuListProps={{
                                            "aria-labelledby": "buttonProfile",
                                        }}
                                    >
                                        <MenuItem onClick={redirectToProfile} style={{ color: colors.primary[100] }}>
                                            My Profile
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout} style={{ color: colors.primary[100] }}>
                                            Log Out
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            ) : (
                                <Box display={"flex"} flexDirection={"row"} columnGap={1}>
                                    <Link href="/login">
                                        <Button
                                            variant="text"
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                columnGap: 1,
                                                px: 2,
                                                py: 1,
                                                color: colors.primary[100],
                                                "&:hover": {
                                                    backgroundColor: colors.greenAccent[700],
                                                    color: colors.grey[100],
                                                },
                                            }}
                                        >
                                            <LockOpenIcon />
                                            <Typography
                                                sx={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                Sign In
                                            </Typography>
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button
                                            variant="text"
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                columnGap: 1,
                                                px: 2,
                                                py: 1,
                                                color: colors.primary[100],
                                                "&:hover": {
                                                    backgroundColor: colors.greenAccent[700],
                                                    color: colors.grey[100],
                                                },
                                            }}
                                        >
                                            <AppRegistrationIcon />
                                            <Typography
                                                sx={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                Sign Up
                                            </Typography>
                                        </Button>
                                    </Link>
                                </Box>
                            )}
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
            {/* <HeaderMobile
                closeMenuGenres={closeMenuGenres}
                genres={genres}
                anchorElProfile={anchorElProfile}
                redirectToProfile={redirectToProfile}
                openMenuProfile={openMenuProfile}
                closeMenuProfile={closeMenuProfile}
                handleLogout={handleLogout}
            /> */}
        </>
    );
};

export default Header;
