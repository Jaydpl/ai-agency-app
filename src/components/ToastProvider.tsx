import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(15, 23, 42, 0.9)',
          color: '#fff',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(100, 200, 255, 0.2)',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        },
        success: {
          duration: 3000,
          style: {
            borderColor: 'rgba(74, 222, 128, 0.3)',
          },
          iconTheme: {
            primary: '#4ade80',
            secondary: '#0f172a',
          },
        },
        error: {
          duration: 4000,
          style: {
            borderColor: 'rgba(239, 68, 68, 0.3)',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#0f172a',
          },
        },
        loading: {
          style: {
            borderColor: 'rgba(100, 200, 255, 0.3)',
          },
          iconTheme: {
            primary: '#64c8ff',
            secondary: '#0f172a',
          },
        },
      }}
    />
  );
}
