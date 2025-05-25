import { SidebarProvider } from '@/context/SidebarContext';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <SidebarProvider>{children}</SidebarProvider>;
}
