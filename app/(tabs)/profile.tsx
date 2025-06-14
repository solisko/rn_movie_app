import { icons } from "@/constants/icons";
import { Image, Text, View } from "react-native";
const Profile = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex flex-col flex-1 items-center justify-center gap-5">
        <Image source={icons.person} className="size-10" tintColor={"#fff"} />
        <Text className="text-gray-500">Profile</Text>
      </View>
    </View>
  );
};
export default Profile;
