import { create } from "zustand";
import { Transaction } from "../models/Transaction";
import { transactionsService } from "../services/transactionsService";

interface TransactionsState {
    transactions: Transaction[]
    isLoading: boolean
    error: string | null
    getTransactions: () => Promise<void>
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
    transactions: [],
    isLoading: false,
    error: null,
    getTransactions: async () => {
        set({ isLoading: true, error: null })
        try {
            const data = await transactionsService.getTransactions()
            set({ transactions: data, isLoading: false })
        } catch (error) {
            set({ error: "Failed to load transactions.", isLoading: false })
        }
    },
}))