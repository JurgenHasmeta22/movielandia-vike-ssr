import prisma from "../prisma/prisma";

export const getAllMovies = async () => {
  const movies = await prisma.movie.findMany();
  return movies;
};
