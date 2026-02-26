import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";
import { useTransactionsStore } from "../store/useTransactionsStore";
import { Alert, Button, ScrollView, Share, StyleSheet, Text, View } from "react-native";

type DetailsRouteProp = RouteProp<
    RootStackParamList,
    'TransactionDetails'
>

const TransactionDetailsScreen = () => {
    const route = useRoute<DetailsRouteProp>()
    const { refId } = route.params

    const { transactions } = useTransactionsStore()
    const transaction = transactions.find((t) => t.refId === refId)

    if (!transaction) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Transaction not found.</Text>
            </View>
        )
    }

    const handleShare = async () => {
        try {
            const message = `
                Transaction Details
                Reference ID: ${transaction.refId}
                Recipient: ${transaction.recipientName}
                TransferName: ${transaction.transferName}
                Date: ${transaction.transferDate}
                Amount: RM ${Math.abs(transaction.amount).toFixed(2)}
            `
            await Share.share({message})
        } catch (error) {
            Alert.alert('Error', 'Failed to share transaction details.')
        }
    }

    const isOutgoing = transaction.amount < 0

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Reference ID:</Text>
                <Text style={styles.value}>{transaction.refId}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Recipient Name:</Text>
                <Text style={styles.value}>{transaction.recipientName}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Transfer Name:</Text>
                <Text style={styles.value}>{transaction.transferName}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{new Date(transaction.transferDate).toLocaleDateString()}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={[styles.value, isOutgoing ? styles.outgoing : styles.incoming]}>
                    {isOutgoing ? '-' : '+' } RM {Math.abs(transaction.amount).toFixed(2)}
                </Text>
            </View>

            <View style={styles.button}>
                <Button title="Share" onPress={handleShare} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    row: { marginBottom: 16, },
    label: {
        fontWeight: '500',
        color: '#555',
        marginBottom: 4,
    },
    value: { fontSize: 16, },
    incoming: { color: 'green' },
    outgoing: { color: 'red' },
    button: { marginTop: 32, },
    errorText: {
        color: 'red',
        fontSize: 16,
        padding: 16,
    },
})

export default TransactionDetailsScreen

