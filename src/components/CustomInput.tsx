import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES } from '../constants/theme';

export type CustomInputRef = React.ElementRef<typeof TextInput>;

export interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const CustomInput = forwardRef<CustomInputRef, CustomInputProps>(
  (
    {
      label,
      error,
      containerStyle,
      inputStyle,
      onFocus,
      onBlur,
      ...textInputProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const hasError = Boolean(error);

    const borderColor = hasError
      ? theme.colors.error
      : isFocused
      ? theme.colors.primary
      : theme.colors.border;

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>

        <TextInput
          ref={ref}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              borderColor,
              color: theme.colors.text,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...textInputProps}
        />

        {hasError && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

CustomInput.displayName = 'CustomInput';

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    width: '100%',
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZES.md,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
    fontWeight: '500',
  },
});
