import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MovieProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: MovieProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placehold.co/600x400/1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center gap-x-1 mt-1">
          {Array.from({ length: Math.round(vote_average / 2) }).map(
            (_, index) => (
              <Image key={index} source={icons.star} className="size-4" />
            )
          )}
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default MovieCard;
