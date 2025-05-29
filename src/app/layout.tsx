import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { OrdersProvider } from '@/contexts/OrdersContext'
import { UsersProvider } from '@/contexts/UsersContext'
import { ProductsProvider } from '@/contexts/ProductsContext'

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "PhoneShop - Интернет-магазин смартфонов",
  description: "Лучшие смартфоны и аксессуары по выгодным ценам. Широкий выбор техники Apple, Samsung, Xiaomi и других брендов.",
  keywords: "смартфоны, телефоны, iPhone, Samsung, Xiaomi, аксессуары, купить телефон",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased min-h-screen bg-gray-50`}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <OrdersProvider>
                <UsersProvider>
                  <ProductsProvider>
                    {children}
                  </ProductsProvider>
                </UsersProvider>
              </OrdersProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
