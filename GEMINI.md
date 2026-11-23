# BGP 201 Mobil Programlama - Abonelik Yönetim Sistemi Proje Kuralları

## 1. Genel Mimari ve Teknoloji
- **Teknoloji:** React Native (Expo) + TypeScript[cite: 2]
- **Grup Yapısı:** 2 kişilik grup projesi (En az 7 ekran + ek özellik: Karanlık Tema & Yerel Bildirim)[cite: 8, 24]
- **Tip Güvenliği:** Kodun hiçbir yerinde `any` kullanılmaz. Tüm props, state, navigasyon parametreleri ve API yanıtları kesin interface/type ile tanımlanır[cite: 7].
- **İsimlendirme:**
  - Ekran ve bileşen dosyaları: `PascalCase` (örn: `AddSubscriptionScreen.tsx`, `CustomInput.tsx`)[cite: 7]
  - Değişkenler ve fonksiyonlar: `camelCase` (örn: `subscriptionName`, `validateForm()`)[cite: 7]
  - Sabitler: `UPPER_SNAKE_CASE` (örn: `CURRENCY_OPTIONS`)[cite: 7]
- **Kod Kalitesi:** Hiçbir ekran dosyası 300 satırı geçmez[cite: 8]. Renkler ve font boyutları kod içine hardcoded yazılmaz, `src/constants/theme.ts` üzerinden çekilir[cite: 8]. API ve Firebase işlemleri `src/services/` içinde yazılır[cite: 8].

## 2. Ortak Veri Sözleşmesi (`src/types/index.ts`)
- `Currency = 'TRY' | 'USD' | 'EUR'`
- `BillingCycle = 'monthly' | 'yearly'`
- `SubscriptionCategory = 'Eğlence' | 'Yazılım' | 'Fatura' | 'Eğitim' | 'Diğer'`
- `Subscription`: `{ id: string; name: string; amount: number; currency: Currency; billingCycle: BillingCycle; paymentDay: number; category: SubscriptionCategory; }`

## 3. Görev Dağılımı (Dosya Sınırları)
- **Öğrenci 1 (No1):** `src/constants/theme.ts`, `src/context/ThemeContext.tsx`, `src/context/SubscriptionContext.tsx`, `src/navigation/`, `src/services/firebase.ts`, `src/services/subscriptionService.ts`, `LoginScreen.tsx`, `RegisterScreen.tsx`, `ProfileScreen.tsx`[cite: 7, 24].
- **Öğrenci 2 (No2 - Kaan):** `src/utils/validation.ts`, `src/services/currencyApi.ts`, `src/services/notificationService.ts`, `src/components/CustomInput.tsx`, `src/components/SubscriptionCard.tsx`, `AddSubscriptionScreen.tsx`, `SubscriptionsScreen.tsx`, `HomeScreen.tsx`, `SubscriptionDetailScreen.tsx`[cite: 7, 24].