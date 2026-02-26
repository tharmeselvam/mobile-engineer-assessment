import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";
import { useTransactionsStore } from "../store/useTransactionsStore";
import { Alert, Button, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { generatePDF } from 'react-native-html-to-pdf';

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
            const htmlContent = `
                <h2>Transaction Details</h2>
                <p><strong>Reference ID:</strong> ${transaction.refId}</p>
                <p><strong>Recipient Name:</strong> ${transaction.recipientName}</p>
                <p><strong>Transfer Name:</strong> ${transaction.transferName}</p>
                <p><strong>Date:</strong> ${new Date(transaction.transferDate).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> RM ${Math.abs(transaction.amount).toFixed(2)}</p>
            `

            const options = {
                html: htmlContent,
                fileName: `Transaction_${transaction.refId}`,
                base64: true,
            }

            const file = await generatePDF(options)

            console.log(file)

            await Share.share({
                url: `file://${file.filePath}`,
                title: 'Transaction Details',
            })
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
                <Text style={[styles.amountValue, isOutgoing ? styles.outgoing : styles.incoming]}>
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
    row: { marginBottom: 25, },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        marginBottom: 4,
    },
    value: { 
        fontSize: 20,
        fontWeight: '600',
        color: '#2e2e2e',
    },
    amountValue: {
        fontSize: 25,
        fontWeight: '700',
    },
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

