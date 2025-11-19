import Sidebar from "../components/Sidebar.jsx";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className=" bg-gray-800 text-white p-4">
        <Sidebar />
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
