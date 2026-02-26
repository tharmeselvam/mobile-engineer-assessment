import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import TransactionListItem from "../components/TransactionListItem";
import { Transaction } from "../models/Transaction";

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'TransactionList'
>

const TransactionListScreen = () => {
    const navigation = useNavigation<NavigationProp>()

    const handlePress = (refId: string) => {
        navigation.navigate('TransactionDetails', { refId })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={mockTransactions}
                keyExtractor={(item) => item.refId}
                renderItem={({item}) => (
                    <TransactionListItem transaction={item} onPress={() => handlePress(item.refId)} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
})

export default TransactionListScreen
