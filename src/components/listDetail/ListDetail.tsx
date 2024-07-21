import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import CardItem from "../cardItem/CardItem";
import { tokens } from "~/utils/theme";

interface IListDetail {
    data: any;
    type: string;
    role: string;
}

export function ListDetail({ data, type, role }: IListDetail) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            {data && data.length > 0 && (
                <>
                    <Divider sx={{ borderBottomWidth: 3, background: colors.primary[100] }} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            rowGap: 2,
                            marginBottom: 2,
                            marginTop: 2,
                        }}
                        component={"section"}
                    >
                        <Box>
                            <Typography fontSize={28}>
                                {role === "latest" ? "Latest" : "Related"} {type === "movie" ? "Movies" : "Series"}
                            </Typography>
                            <Divider sx={{ borderBottomWidth: 3, background: colors.primary[100] }} />
                        </Box>
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            columnGap={3}
                            rowGap={3}
                            justifyContent="flex-start"
                            alignContent="center"
                            mt={1}
                            mb={4}
                        >
                            {data &&
                                data.length > 0 &&
                                !data.error &&
                                data
                                    .slice(0, 5)
                                    .map((item: any, index: number) => (
                                        <CardItem data={item} key={index} type={type} />
                                    ))}
                        </Stack>
                    </Box>
                </>
            )}
        </>
    );
}

export default ListDetail;
