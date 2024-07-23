import { useData } from "vike-react/useData";
import { Data } from "./+data";
import CardItem from "~/components/root/ui/cardItem/CardItem";
import Loading from "~/components/root/ui/loading/Loading";

export default function Page() {
    const movie = useData<Data>();

    if (!movie) {
        return <Loading />;
    }

    return <CardItem data={movie} type="movie" />;
}
