'use client'; // ✅ 꼭 추가해야 함

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

export default function InitializeAuth() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return null; // 화면에 아무것도 안 보여줘도 됨
}
