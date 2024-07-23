import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { tokens } from "~/utils/theme";
import CardItem from "../../ui/cardItem/CardItem";

interface ILatestListProps {
    data: any;
    type: string;
}

export function LatestList({ data, type }: ILatestListProps) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            component={"section"}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                rowGap: 2,
                marginBottom: 4,
            }}
        >
            <Box>
                <Typography fontSize={28} variant="h2">
                    Latest {type}
                </Typography>
                <Divider sx={{ borderBottomWidth: 3, background: colors.primary[100], mt: 1 }} />
            </Box>
            <Stack
                direction="row"
                flexWrap="wrap"
                rowGap={8}
                columnGap={4}
                justifyContent={"start"}
                alignContent={"center"}
                marginTop={3}
                mb={4}
            >
                {data
                    ?.slice(0, 5)
                    .map((item: any) => (
                        <CardItem data={item} key={item.id} type={`${type === "Movies" ? "movie" : "serie"}`} />
                    ))}
            </Stack>
        </Box>
    );
}

export default LatestList;
