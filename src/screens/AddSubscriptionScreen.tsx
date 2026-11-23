import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import { Currency, BillingCycle, SubscriptionCategory } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { CustomInput, CustomInputRef } from '../components/CustomInput';
import { validateSubscriptionForm } from '../utils/validation';
import {
  SPACING,
  FONT_SIZES,
  CURRENCY_OPTIONS,
  BILLING_CYCLE_OPTIONS,
  CATEGORY_OPTIONS,
} from '../constants/theme';

export interface AddSubscriptionScreenProps {
  navigation?: { navigate: (screen: string) => void };
  onSuccess?: () => void;
}

export const AddSubscriptionScreen: React.FC<AddSubscriptionScreenProps> = ({
  navigation,
  onSuccess,
}) => {
  const { theme } = useTheme();
  const { addSubscription } = useSubscriptions();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<Currency>('TRY');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [paymentDay, setPaymentDay] = useState('');
  const [category, setCategory] = useState<SubscriptionCategory>('Eğlence');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameInputRef = useRef<CustomInputRef>(null);
  const amountInputRef = useRef<CustomInputRef>(null);
  const paymentDayInputRef = useRef<CustomInputRef>(null);

  const resetForm = () => {
    setName('');
    setAmount('');
    setPaymentDay('');
    setCurrency('TRY');
    setBillingCycle('monthly');
    setCategory('Eğlence');
    setErrors({});
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    const valErrors = validateSubscriptionForm({
      name,
      amount,
      paymentDay,
      currency,
      billingCycle,
      category,
    });

    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    }

    setErrors({});
    addSubscription({
      name: name.trim(),
      amount: parseFloat(amount.trim().replace(',', '.')),
      currency,
      billingCycle,
      paymentDay: parseInt(paymentDay.trim(), 10),
      category,
    });

    Alert.alert('Başarılı', 'Abonelik başarıyla kaydedildi!', [
      {
        text: 'Tamam',
        onPress: () => {
          resetForm();
          if (navigation?.navigate) {
            navigation.navigate('Subscriptions');
          } else if (onSuccess) {
            onSuccess();
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Yeni Abonelik Ekle
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Harcama ve ödeme detaylarını giriniz.
        </Text>

        <CustomInput
          ref={nameInputRef}
          label="Servis Adı *"
          placeholder="Örn: Netflix, Spotify, iCloud"
          value={name}
          onChangeText={(v) => {
            setName(v);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          error={errors.name}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => amountInputRef.current?.focus()}
        />

        <CustomInput
          ref={amountInputRef}
          label="Tutar *"
          placeholder="Örn: 149.99"
          value={amount}
          onChangeText={(v) => {
            setAmount(v);
            if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
          }}
          error={errors.amount}
          keyboardType="decimal-pad"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => paymentDayInputRef.current?.focus()}
        />

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Para Birimi</Text>
          <View style={styles.chipRow}>
            {CURRENCY_OPTIONS.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setCurrency(c)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: currency === c ? theme.colors.primary : theme.colors.surface,
                    borderColor: currency === c ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text style={[styles.chipText, { color: currency === c ? '#FFF' : theme.colors.text }]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Fatura Döngüsü</Text>
          <View style={styles.chipRow}>
            {BILLING_CYCLE_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setBillingCycle(item.value)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: billingCycle === item.value ? theme.colors.primary : theme.colors.surface,
                    borderColor: billingCycle === item.value ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text style={[styles.chipText, { color: billingCycle === item.value ? '#FFF' : theme.colors.text }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <CustomInput
          ref={paymentDayInputRef}
          label="Ödeme Günü (1-31) *"
          placeholder="Örn: 15"
          value={paymentDay}
          onChangeText={(v) => {
            setPaymentDay(v);
            if (errors.paymentDay) setErrors((prev) => ({ ...prev, paymentDay: '' }));
          }}
          error={errors.paymentDay}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Kategori</Text>
          <View style={styles.categoryWrap}>
            {CATEGORY_OPTIONS.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: category === cat ? theme.colors.primary : theme.colors.surface,
                    borderColor: category === cat ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text style={[styles.categoryText, { color: category === cat ? '#FFF' : theme.colors.text }]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSubmit}
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.saveButtonText}>Aboneliği Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: SPACING.md, paddingBottom: SPACING.xl * 2 },
  headerTitle: { fontSize: FONT_SIZES.xxl, fontWeight: '800', marginBottom: SPACING.xs },
  headerSubtitle: { fontSize: FONT_SIZES.sm, marginBottom: SPACING.lg },
  section: { marginBottom: SPACING.md },
  label: { fontSize: FONT_SIZES.sm, fontWeight: '600', marginBottom: SPACING.xs },
  chipRow: { flexDirection: 'row', gap: SPACING.sm },
  chip: { flex: 1, height: 42, borderRadius: 8, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  chipText: { fontSize: FONT_SIZES.sm, fontWeight: '700' },
  categoryWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  categoryChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: 20, borderWidth: 1.5 },
  categoryText: { fontSize: FONT_SIZES.sm, fontWeight: '600' },
  saveButton: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: FONT_SIZES.md, fontWeight: '700' },
});
