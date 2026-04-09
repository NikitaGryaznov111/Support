import { SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/sidebar/components/Sidebar';
import { PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MainLayout() {
  const { toggleSidebar, openMobile, isMobile } = useSidebar();

  // На мобильных скрываем контент когда sidebar открыт
  const isContentHidden = isMobile && openMobile;

  return (
    <div className="flex min-h-svh w-full">
      <Sidebar />
      <SidebarInset className="flex flex-col">
        <header className={`sticky top-0 flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6 ${isMobile && openMobile ? 'hidden' : 'z-30'}`}>
          {/* Кнопка открытия меню на мобильных / сворачивания на десктопе */}
          <Button
            variant="ghost"
            size="icon"
            className="-ml-1 shrink-0"
            onClick={toggleSidebar}
          >
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>

          <h1 className="text-lg font-semibold">Support</h1>
        </header>
        <main
          className={`flex-1 overflow-y-auto p-4 md:p-6 ${isContentHidden ? 'hidden' : ''}`}
        >
          <Outlet />
        </main>
      </SidebarInset>
    </div>
  );
}
