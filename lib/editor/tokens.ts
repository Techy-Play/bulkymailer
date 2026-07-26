import { DesignTokens } from './types';
import { EditorEventBus } from './events';

export const DEFAULT_DESIGN_TOKENS: DesignTokens = {
  colors: {
    primary: '#4F46E5',
    secondary: '#111827',
    background: '#FFFFFF',
    cardBackground: '#F9FAFB',
    textPrimary: '#111827',
    textMuted: '#6B7280',
    accent: '#8B5CF6',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    baseSize: '16px',
  },
};

export class TokenEngine {
  private tokens: DesignTokens;

  constructor(initialTokens?: Partial<DesignTokens>) {
    this.tokens = {
      ...DEFAULT_DESIGN_TOKENS,
      ...initialTokens,
      colors: { ...DEFAULT_DESIGN_TOKENS.colors, ...(initialTokens?.colors || {}) },
      spacing: { ...DEFAULT_DESIGN_TOKENS.spacing, ...(initialTokens?.spacing || {}) },
      borderRadius: { ...DEFAULT_DESIGN_TOKENS.borderRadius, ...(initialTokens?.borderRadius || {}) },
    };
  }

  getTokens(): DesignTokens {
    return this.tokens;
  }

  updateTokens(newTokens: Partial<DesignTokens>): DesignTokens {
    this.tokens = {
      ...this.tokens,
      ...newTokens,
      colors: { ...this.tokens.colors, ...(newTokens.colors || {}) },
      spacing: { ...this.tokens.spacing, ...(newTokens.spacing || {}) },
      borderRadius: { ...this.tokens.borderRadius, ...(newTokens.borderRadius || {}) },
    };

    EditorEventBus.emit('ThemeChanged', { tokens: this.tokens });
    return this.tokens;
  }

  resolveColor(colorValue?: string): string {
    if (!colorValue) return this.tokens.colors.primary;
    if (colorValue in this.tokens.colors) {
      return (this.tokens.colors as any)[colorValue];
    }
    return colorValue;
  }
}

export const tokenEngine = new TokenEngine();
