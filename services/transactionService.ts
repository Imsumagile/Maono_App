import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

export interface Transaction {
    id?: string;
    type: 'Contribution' | 'Loan' | 'Loan Repayment';
    amount: number;
    memberId: string;
    memberName: string;
    date: string;
    createdBy: string;
    status: 'Completed' | 'Pending';
}

export const transactionService = {
    // Add a new transaction
    async addTransaction(transaction: Omit<Transaction, 'id'>) {
        return await addDoc(collection(db, 'transactions'), transaction);
    },

    // Get all transactions
    async getAllTransactions(): Promise<Transaction[]> {
        const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const transactions: Transaction[] = [];
        querySnapshot.forEach((doc) => {
            transactions.push({ id: doc.id, ...doc.data() } as Transaction);
        });
        return transactions;
    },

    // Calculate Dashboard Totals
    async getDashboardTotals() {
        const transactions = await this.getAllTransactions();
        let totalContributions = 0;
        let totalLoans = 0;
        let activeLoansCount = 0;

        transactions.forEach(t => {
            if (t.type === 'Contribution') {
                totalContributions += t.amount;
            } else if (t.type === 'Loan') {
                totalLoans += t.amount;
                activeLoansCount++;
            } else if (t.type === 'Loan Repayment') {
                totalLoans -= t.amount;
            }
        });

        return {
            vaultBalance: totalContributions - totalLoans, // Total in vault is all contributions minus what is currently lent out
            loanPool: totalLoans, // This is the total outstanding debt
            activeLoans: activeLoansCount,
            totalMembers: 0
        };
    }
};
