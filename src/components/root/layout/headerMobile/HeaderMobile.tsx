import { CloseOutlined, Clear, Search } from "@mui/icons-material";
import {
    Box,
    Button,
    Drawer,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useStore } from "~/store/store";
import MovieIcon from "@mui/icons-material/Movie";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useState } from "react";
import { tokens } from "~/utils/theme";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import IGenre from "~/types/IGenre";
import { Link } from "../link/Link";
import { navigate } from "vike/client/router";

interface IHeaderMenu {
    closeMenuGenres: () => void;
    openMenuProfile: (event: any) => void;
    closeMenuProfile: () => void;
    redirectToProfile: () => void;
    handleLogout: () => void;
    genres: IGenre[];
    anchorElProfile: null | HTMLElement;
}

export default function HeaderMobile({
    closeMenuGenres,
    genres,
    anchorElProfile,
    openMenuProfile,
    closeMenuProfile,
    redirectToProfile,
    handleLogout,
}: IHeaderMenu) {
    const [anchorElGenresMobile, setAnchorElGenresMobile] = useState<null | HTMLElement>(null);
    const { user, openDrawer, setOpenDrawer } = useStore();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const openMenuGenresMobile = (event: React.MouseEvent<HTMLLIElement>) => {
        setAnchorElGenresMobile(event.currentTarget);
    };

    const closeMenuGenresMobile = () => {
        setAnchorElGenresMobile(null);
    };

    const handleDrawerToggle = () => {
        setOpenDrawer(false);
    };

    return (
        <Drawer variant="persistent" open={openDrawer} onClose={handleDrawerToggle} component={"aside"}>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        placeContent: "end",
                        marginRight: 2,
                        marginTop: 1,
                    }}
                >
                    <IconButton
                        onClick={() => {
                            setOpenDrawer(false);
                        }}
                    >
                        <CloseOutlined />
                    </IconButton>
                </Box>
                <List
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 1,
                        alignItems: "center",
                        justifyContent: "start",
                    }}
                >
                    <ListItem>
                        <Link href={"/"}>
                            <Typography
                                onClick={() => {
                                    setOpenDrawer(false);
                                }}
                            >
                                MovieLandia24
                            </Typography>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link
                            href="/movies"
                            // onClick={() => {
                            //     setOpenDrawer(false);
                            //     window.scrollTo(0, 0);
                            // }}
                        >
                            <MovieIcon fontSize={"large"} />
                            Movies
                        </Link>
                    </ListItem>
                    <ListItem onMouseEnter={openMenuGenresMobile} onMouseLeave={closeMenuGenresMobile}>
                        <Link href={"/genres"}>
                            <SubtitlesIcon fontSize={"large"} />
                            Genres
                        </Link>
                        <Menu
                            anchorEl={anchorElGenresMobile}
                            open={Boolean(anchorElGenresMobile)}
                            onClose={closeMenuGenresMobile}
                            MenuListProps={{
                                onMouseLeave: closeMenuGenresMobile,
                                style: { padding: 10 },
                            }}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            {genres.map((genre: IGenre) => (
                                <MenuItem
                                    key={genre.id}
                                    onClick={async () => {
                                        closeMenuGenres();
                                        const navigationPromise = navigate(`/genres/${genre.name}`);
                                        await navigationPromise;
                                        setOpenDrawer(false);
                                    }}
                                >
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </ListItem>
                    <ListItem>
                        <Link
                            href="/series"
                            // onClick={() => {
                            //     setOpenDrawer(false);
                            //     window.scrollTo(0, 0);
                            // }}
                        >
                            <LocalMoviesIcon fontSize={"large"} />
                            Series
                        </Link>
                    </ListItem>
                    <ListItem
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            rowGap: 1,
                        }}
                    >
                        <TextField
                            placeholder="What are you going to watch today?"
                            value={searchParams.get("search") ? searchParams.get("search") : ""}
                            size="small"
                            onChange={(e) => {
                                const value = e.target.value;

                                if (value.length > 0) {
                                    navigate(`/movies?search=${value}`);
                                } else {
                                    navigate("/movies");
                                }
                            }}
                            InputProps={{
                                color: "secondary",
                                sx: {
                                    py: 0.5,
                                },
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
                                                if (searchParams.get("search")) {
                                                    const navigationPromise = navigate("/movies");
                                                    await navigationPromise;
                                                }
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {user !== null ? (
                            <Box>
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
                                    {user?.userName}
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
                            <Stack flexDirection={"row"} columnGap={2}>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    size="medium"
                                    onClick={function () {
                                        navigate("/login");
                                    }}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        columnGap: 1,
                                        px: 2,
                                        py: 1,
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
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    size="medium"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        columnGap: 1,
                                        px: 2,
                                        py: 1,
                                    }}
                                    onClick={function () {
                                        navigate("/register");
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
                            </Stack>
                        )}
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}
