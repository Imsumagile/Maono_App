import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
    uid: string;
    displayName: string;
    email: string;
    role: 'Admin' | 'Member';
    status?: 'Active' | 'Inactive' | 'Pending';
    createdAt: string;
}

export const memberService = {
    // Get all users from Firestore
    async getAllUsers(): Promise<UserProfile[]> {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users: UserProfile[] = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data() as UserProfile);
        });
        return users;
    },

    // Update member status
    async updateMemberStatus(uid: string, status: string) {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, { status });
    },

    // Delete a member
    async deleteMember(uid: string) {
        await deleteDoc(doc(db, 'users', uid));
    }
};
