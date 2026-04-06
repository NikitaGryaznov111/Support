import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/sidebar/components/Sidebar';

export default function MainLayout() {
  return (
    <>
      <Sidebar />
      <SidebarInset>
         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
      {/* На десктопе: сворачивает до иконок. На мобильном: открывает drawer */}
      <SidebarTrigger className="-ml-1" />
    </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </>
  );
}