import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="TransactionList"
                    component={TransactionListScreen}
                    options={{ title: 'Transactions' }}
                />
                <Stack.Screen
                    name="TransactionDetails"
                    component={TransactionDetailsScreen}
                    options={{ title: 'Transaction Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator