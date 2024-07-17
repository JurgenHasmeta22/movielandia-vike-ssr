import prisma from "../prisma/prisma";

export const getAllMovies = async () => {
    const movies = await prisma.movie.findMany();
    return movies;
};

export const getMovieByTitle = async (titleParam: string) => {
    const movie = await prisma.movie.findFirst({
        where: {
            title: { equals: titleParam },
        },
    });

    return movie;
};
