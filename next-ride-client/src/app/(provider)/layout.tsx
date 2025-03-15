
import "../../app/globals.css";
import ProviderSideBar from "@/pages/provider/providerSideBar/providerSidebar";



export default function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   

       <>
       <ProviderSideBar />
        
        {/* ✅ Single <main> (removed nesting) */}
        <main>{children}</main>
       </>
     
  );
}
