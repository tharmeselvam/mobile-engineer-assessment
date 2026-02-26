import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/rootStackParamList";

type DetailsRouteProp = RouteProp<
    RootStackParamList,
    'TransactionDetails'
>

const route = useRoute<DetailsRouteProp>()
const { refId } = route.params