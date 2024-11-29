# SafeSwap Logo Usage Guide

This guide explains how to use the SafeSwap logo in your Next.js application, both with direct JSX and using the custom `SafeSwapLogo` component. It also includes details about the `/branding-demo` view.

---

## 1. Direct JSX Usage

You can include the SafeSwap logo directly in your JSX using Next.js's `Image` component. This approach allows for manual control, but you'll need to handle theme switching.

```jsx
import Image from 'next/image';
import {useEffect} from 'react';

function MyComponent() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
      setDark(JSON.parse(darkMode));
    }
  }, []);

  const logoSrc = dark === true
    ? '/images/logo-dark.svg'
    : '/images/logo-light.svg';

  return (
    <Image
      src={logoSrc}
      alt="SafeSwap Logo"
      width={549}
      height={130}
      className="transition-opacity duration-300"
    />
  );
}
```

## 2. Using the SafeSwapLogo Component

The SafeSwapLogo component simplifies logo usage and automatically handles theme switching.

```jsx
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SafeSwapLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SafeSwapLogo({ width = 200, height = 25, className = '' }: SafeSwapLogoProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
      setDark(JSON.parse(darkMode));
    }
  }, []);
  const logoSrc = dark === true 
    ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-dark-PafBbOMlMn7QXOSIAXWmCntdVeMf6c.svg'
    : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-light-kflz9CbOrw3HdQY9IJs5nkti9C17jJ.svg';

  return (
    <Image
      src={logoSrc}
      alt="SafeSwap Logo"
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${className}`}
      priority
    />
  );
}
```

## Use the Component

```jsx
import { SafeSwapLogo } from '@/components/ui/SafeSwapLogo';

function MyComponent() {
  return (
    <header>
      <SafeSwapLogo width={200} height={50} />
    </header>
  );
}
```
