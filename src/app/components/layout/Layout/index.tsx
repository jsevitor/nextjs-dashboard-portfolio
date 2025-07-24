// import Footer from "./Footer";
import Sidebar from "@/app/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-dvh lg:overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto min-h-dvh">
        <main className="flex-1 p-4 lg:p-8">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
