// app/index.js
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect,router } from "expo-router";
import { ScrollView, View, Image, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function Home() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  justify-items-center items-center min-h-[85vh] px-5 ">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white">
              Dicover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode="contain" />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where Creativity meets innovations: embark on a journey of limitless exploration with Aora</Text>

          <CustomButton title="Continue with Email" handlePress={()=> router.push('/sign-in')} containerStyles="w-full mt-7" />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style='light' />
    </SafeAreaView>
  );
}
