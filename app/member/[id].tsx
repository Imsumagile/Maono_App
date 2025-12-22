import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function MemberDetailScreen() {
    const { id, name } = useLocalSearchParams();
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 pt-6 pb-4 flex-row items-center border-b border-gray-50">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text className="text-gray-900 text-xl font-bold">Member Profile</Text>
            </View>

            <ScrollView className="flex-1 px-6 pt-8">
                <View className="items-center mb-10">
                    <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center mb-4">
                        <Text className="text-primary font-bold text-3xl">{String(name?.[0] || 'U')}</Text>
                    </View>
                    <Text className="text-gray-900 text-2xl font-bold">{name || 'Member Name'}</Text>
                    <Text className="text-gray-400 mt-1">Member ID: {id}</Text>
                </View>

                <View className="space-y-6">
                    <Section label="Contact Information">
                        <InfoItem icon="mail-outline" label="Email" value="member@example.com" />
                        <InfoItem icon="call-outline" label="Phone" value="+255 700 000 000" />
                    </Section>

                    <Section label="Financial Summary">
                        <InfoItem icon="wallet-outline" label="Total Contributions" value="TSh 450,000" color={Colors.primary} />
                        <InfoItem icon="cash-outline" label="Current Loan" value="TSh 0" />
                    </Section>

                    <TouchableOpacity className="bg-primary/10 rounded-xl py-4 items-center mt-6">
                        <Text className="text-primary font-bold">View Transaction History</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Section = ({ label, children }: any) => (
    <View className="mb-6">
        <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 ml-1">{label}</Text>
        <View className="bg-gray-50 rounded-2xl p-4 space-y-4 border border-gray-100">
            {children}
        </View>
    </View>
);

const InfoItem = ({ icon, label, value, color = '#64748B' }: any) => (
    <View className="flex-row items-center py-2">
        <Ionicons name={icon} size={20} color={color} />
        <View className="ml-4">
            <Text className="text-gray-400 text-xs">{label}</Text>
            <Text className="text-gray-900 font-semibold">{value}</Text>
        </View>
    </View>
);
