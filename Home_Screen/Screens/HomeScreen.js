import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
// import randomImage from '../assets/images/randomImage'
import randomImage from '../assets/random'

var items = [
    {
        id: 1,
        place: 'Chat Screen'
    },
    {
        id: 2,
        place: 'Event'
    },
    {
        id: 3,
        place: 'Map'
    },
    {
        id: 4,
        place: 'Setting'
    }
]
export default function HomeScreen() {
    return (
        <ScreenWrapper className="flex-1">
            <View className="flex-row justify-between items-center p-4">
                <Text className={1`${colors.heading} font-bold text-3xl shadow-sm`}>MyAlumniApp</Text>
                <TouchableOpacity className="p-2 px-3 bg-white border border-gray-200 rounded=full">
                    <Text className={colors.heading}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
                <Image source={require('../assets/banner.png')} className="w-60 h-60" />
            </View>
            <View className="px-4 space-y-3">
                <View className="flex-row justify-between items-center">
                    <Text className={`${colors.heading} font-bold text-xl`}>Corners</Text>
                    <Touchableopacity className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                        <Text className={colors.heading}>-</Text>
                    </Touchableopacity>
                </View>
                <View>
                    <FlatList
                        data={items}
                        numColumns={2}
                        keyExtractor={item.id}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{
                            justifyContent: 'space-between'
                        }}
                        className="mx-1"
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                                    <View>
                                        <Image source={randomImage} className="w-36 h-36 mb-2" />
                                        <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                                        {/* <Text className = {`${colors.heading} text-xs`}>{item.place}</Text> */}
                                        <Text>{item.place}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    ></FlatList>
                </View>
            </View>
        </ScreenWrapper>
    )
}
