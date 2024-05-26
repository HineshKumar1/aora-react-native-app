import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  initialQuery,
  ...props
}) => {
  const pathname = usePathname();
  const [query, setquery] = useState(initialQuery || '');
  return (
    <View
      className="w-full h-16 px-4 bg-black-100 border-2
       border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4"
    >
      <TextInput
        className="text-base mt-1.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setquery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please Input something to searh results across database"
            );
          }

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
