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

const mockTransactions: Transaction[] = [
    {
        refId: "123ABC",
        transferDate: "2024-10-15T12:34:56Z", 
        recipientName: "John Doe",
        transferName: "Salary Payment",
        amount: 1500.00
    },
    {
        refId: "456DEF",
        transferDate: "2024-09-21T09:12:45Z", 
        recipientName: "Jane Smith",
        transferName: "Invoice Payment",
        amount: 2300.75
    },
    {
        refId: "789GHI",
        transferDate: "2024-10-05T16:18:30Z", 
        recipientName: "Robert Brown",
        transferName: "Refund",
        amount: -500.00
    },
    {
        refId: "101JKL",
        transferDate: "2024-08-30T11:47:22Z", 
        recipientName: "Emily Davis",
        transferName: "Bonus Payment",
        amount: 1200.00
    }
]

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
