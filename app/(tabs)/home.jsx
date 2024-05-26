import { View, Text,  FlatList,Image, RefreshControl, Alert } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { useGlobalContext } from '../../context/GlobalProvider'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPost, getLatestPost } from '../../lib/appwrite'
import { useAppWrite } from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {

  //Calling Custom Hook
  const {data: posts,refetch,isLoading} = useAppWrite(getAllPost);

  const {data: latestPost} = useAppWrite(getLatestPost);

  //Use State
  const {user} = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async()=>{
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary border-2 h-full">
     <FlatList 
    
    data={posts}
     keyExtractor={(item)=>item.$id}
     renderItem={({item})=>(
      <VideoCard title={item.title}
      thumbnail={item.thumbnail}
      video={item.video}
      creator={item.creator.username}
      avatar={item.creator.avatar}/>
     )}
     ListHeaderComponent={()=>(
      <View className="my-6 px-4 sapce-y-6">
         <View className="justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
        {"Hinesh Kumar"}
            </Text>
          </View>
          <View className="mt-1.5 ">
            <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain' />
          </View>
         </View>
         <SearchInput placeholder="Search for a video topic"/>
         <View className="w-full flex-1 pt-5 pb-8 ">
            <Text className="text-gray-100 text-lg font-pregular mb-3">
              Latest Videos 
            </Text>
          <Trending posts={latestPost ?? []}/>
         </View>
      </View>
     )}
     ListEmptyComponent={()=>(
      <EmptyState title="No Video Found" subTitle="Be the first one to upload a video"/>
     )}
     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
/>
    </SafeAreaView>
  )
}

export default Home