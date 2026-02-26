import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { NavigationContainer } from "@react-navigation/native";
import TransactionListScreen from "../screens/TransactionListScreen";
import TransactionDetailsScreen from "../screens/TransactionDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="TransactionList"
                    component={TransactionListScreen}
                    options={{
                        title: 'Transactions',
                        headerTitleStyle: {
                            fontSize: 22,
                            fontWeight: 'bold',
                        }, 
                    }}
                />
                <Stack.Screen
                    name="TransactionDetails"
                    component={TransactionDetailsScreen}
                    options={{
                        title: 'Transaction Details',
                        headerTitleStyle: {
                            fontSize: 22,
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator