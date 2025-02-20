
import "../../app/globals.css";
import ProviderSideBar from "@/pages/provider/providerSideBar/providerSidebar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
       
      <body>
        {/* ✅ Moved <p> inside <body> to prevent hydration error */}
        <p suppressHydrationWarning={true}></p>

        <ProviderSideBar />
        
        {/* ✅ Single <main> (removed nesting) */}
        <main>{children}</main>
      </body>
    </html>
  );
}
