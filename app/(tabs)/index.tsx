import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../services/AuthContext';
import { memberService } from '../../services/memberService';
import { transactionService } from '../../services/transactionService';

export default function DashboardScreen() {
  const { role, user } = useAuth();
  const { t } = useTranslation();
  const isAdmin = role === 'Admin';

  const [stats, setStats] = useState({
    vaultBalance: 0,
    loanPool: 0,
    activeLoans: 0,
    totalMembers: 0,
    personalContribution: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const dashboardTotals = await transactionService.getDashboardTotals();
      const allMembers = await memberService.getAllUsers();

      // Calculate personal contribution if not admin
      let personalContrib = 0;
      if (user) {
        const allTransactions = await transactionService.getAllTransactions();
        personalContrib = allTransactions
          .filter(t => t.memberId === user.uid && t.type === 'Contribution')
          .reduce((sum, t) => sum + t.amount, 0);
      }

      setStats({
        ...dashboardTotals,
        totalMembers: allMembers.length,
        personalContribution: personalContrib
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboardData();
  }, [user]);

  const StatCard = ({ title, value, icon, color, subtitle }: any) => (
    <View style={styles.statCard as ViewStyle}>
      <View
        style={[styles.statIconContainer as ViewStyle, { backgroundColor: color + '15' }]}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statTitle as TextStyle}>{title}</Text>
      <Text style={styles.statValue as TextStyle}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle as TextStyle}>{subtitle}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container as ViewStyle}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.flex1 as ViewStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent as ViewStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
        }
      >
        {/* Header */}
        <View style={styles.header as ViewStyle}>
          <View>
            <Text style={styles.welcomeText as TextStyle}>{t('common.welcomeBack') || 'Welcome back,'}</Text>
            <Text style={styles.userName as TextStyle}>
              {user?.displayName?.split(' ')[0] || 'User'}
            </Text>
          </View>
          <TouchableOpacity style={styles.headerIconBtn as ViewStyle}>
            <Ionicons name="settings-outline" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Main Balance Card */}
        <LinearGradient
          colors={[Colors.primary, Colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard as ViewStyle}
        >
          <View style={styles.balanceHeader as ViewStyle}>
            <View>
              <Text style={styles.balanceLabel as TextStyle}>
                {isAdmin ? "Vault Balance" : "My Contribution"}
              </Text>
              <Text style={styles.balanceValue as TextStyle}>
                TSh {(isAdmin ? stats.vaultBalance : stats.personalContribution).toLocaleString()}
              </Text>
            </View>
            <View style={styles.walletIcon as ViewStyle}>
              <Ionicons name="wallet" size={28} color="white" />
            </View>
          </View>

          <View style={styles.divider as ViewStyle} />

          <View style={styles.balanceFooter as ViewStyle}>
            <View>
              <Text style={styles.footerLabel as TextStyle}>Loan Pool</Text>
              <Text style={styles.footerValue as TextStyle}>TSh {stats.loanPool.toLocaleString()}</Text>
            </View>
            <TouchableOpacity style={styles.quickPayBtn as ViewStyle}>
              <Text style={styles.quickPayText as TextStyle}>Details</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Action Quick Stats */}
        <View style={styles.section as ViewStyle}>
          <View style={styles.sectionHeader as ViewStyle}>
            <Text style={styles.sectionTitle as TextStyle}>Society Overview</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll as ViewStyle}>
            <StatCard
              title="Members"
              value={`${stats.totalMembers}`}
              icon="people"
              color="#3B82F6"
              subtitle="Active society"
            />
            <StatCard
              title="Active Loans"
              value={`${stats.activeLoans}`}
              icon="cash"
              color="#8B5CF6"
              subtitle="Current out"
            />
            <StatCard
              title="Society Growth"
              value="Live"
              icon="trending-up"
              color="#10B981"
              subtitle="Connected to Firestore"
            />
          </ScrollView>
        </View>

        {/* Admin Tools - For Manual Alerts */}
        {isAdmin && (
          <View style={styles.section as ViewStyle}>
            <View style={styles.sectionHeader as ViewStyle}>
              <Text style={styles.sectionTitle as TextStyle}>Admin Controls</Text>
            </View>

            <TouchableOpacity
              onPress={async () => {
                try {
                  await import('../../services/emailService').then(m => m.sendEmailReminderToAllAdmins());
                  Alert.alert("Success", "Manual email reminders have been sent successfully!");
                } catch (error) {
                  console.error(error);
                  Alert.alert("Error", "Failed to send manual reminders.");
                }
              }}
              style={styles.adminActionBtn as ViewStyle}
            >
              <View style={styles.adminActionLeft as ViewStyle}>
                <View style={styles.adminActionIconContainer as ViewStyle}>
                  <Ionicons name="mail-unread" size={24} color="white" />
                </View>
                <View>
                  <Text style={styles.adminActionTitle as TextStyle}>Send Manual Reminder</Text>
                  <Text style={styles.adminActionSubtitle as TextStyle}>Push emails to all admins now</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 24,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  headerIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  balanceCard: {
    borderRadius: 32,
    padding: 32,
    marginBottom: 40,
    elevation: 8,
    shadowColor: '#F57C00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  balanceValue: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  walletIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    marginBottom: 24,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  footerValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickPayBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  quickPayText: {
    color: '#EA580C',
    fontSize: 12,
    fontWeight: '900',
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  statsScroll: {
    paddingRight: 24,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginRight: 16,
    width: 170,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statSubtitle: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 4,
  },
  adminActionBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  adminActionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminActionIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  adminActionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adminActionSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});
