import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const loginSchema = yup.object({
  email: yup
    .string()
    .required('E-posta adresi zorunludur!')
    .email('Geçerli bir e-posta adresi girin!'),
  password: yup
    .string()
    .required('Şifre gerekli!')
    .min(6, 'Şifre en az 6 karakter olmalıdır!'),
});

export default function LoginScreen() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { user, token, error, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      router.replace('/(tabs)');
      
    }else if(status === "failed"){
      Alert.alert("Giriş Hatası", error)
    }
  }, [status, router]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://fakestoreapi.com/icons/logo.png' }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Başlık */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Hoş Geldiniz</Text>
            <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* E-posta */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={20} color="#666" />
              </View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="E-posta"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                }}
              >
                {errors.email?.message}
              </Text>
            )}

            {/* Parola */}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" />
              </View>
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onBlur, onChange } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Parola"
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />

              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Ionicons
                  name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {errors.password && (
              <Text
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                }}
              >
                {errors.password?.message}
              </Text>
            )}

            {/* Parolamı Unuttum */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Parolamı Unuttum</Text>
            </TouchableOpacity>

            {/* Giriş Butonu */}
            <Button
              title="Giriş Yap"
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              fullWidth
            />
          </View>
        </View>

        {/* Kayıt Ol */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Hesabınız yok mu?</Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.registerText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 80,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: '#2f95dc',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    color: '#666',
    marginRight: 4,
  },
  registerText: {
    color: '#2f95dc',
    fontWeight: 'bold',
  },
});
