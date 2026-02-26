import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/rootStackParamList";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'TransactionList'
>

const navigation = useNavigation<NavigationProp>()