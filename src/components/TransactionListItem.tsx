import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Transaction } from "../models/Transaction"

interface Props {
    transaction: Transaction
    onPress: () => void
}

const TransactionListItem: React.FC<Props> = ({ transaction, onPress }) => {
    const isOutgoing = transaction.amount < 0
    const formattedAmount = `${isOutgoing ? '-' : "+"} RM ${Math.abs(transaction.amount).toFixed(2)}`

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.left}>
                <Text style={styles.transferName}>{transaction.transferName}</Text>
                <Text style={styles.transferDate}>{new Date(transaction.transferDate).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.amount, isOutgoing ? styles.outgoing : styles.incoming]}>
                {formattedAmount}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        elevation: 1,
        marginBottom: 10,
        borderRadius: 12,
    },
    left: {},
    transferName: {
        fontSize: 16,
        fontWeight: '500',
    },
    transferDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: '500',
    },
    incoming: { color: 'green' },
    outgoing: { color: 'red' },
})

export default TransactionListItem