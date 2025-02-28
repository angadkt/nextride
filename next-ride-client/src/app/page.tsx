import Navbar from "@/components/navbar/navBar";
import Companies from "@/pages/companyInfo/companies";
// import BookingForm from "@/pages/bookingForm/bookingform";
import Hero from "@/pages/heroSection/hero";
import TopBikesSection from "@/pages/topBikes/topBikes";
// import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
  const ClientId: any = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <>
      {/* <GoogleOAuthProvider clientId={ClientId} > */}
      <Navbar />
      <Hero />

      <Companies />
      <TopBikesSection />
      {/* </GoogleOAuthProvider> */}
    </>
  );
}
