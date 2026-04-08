import { SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/sidebar/components/Sidebar';
import { Menu, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export default function MainLayout() {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <Sidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
          {/* Кнопка открытия меню на мобильных / сворачивания на десктопе */}
          <Button
            variant="ghost"
            size="icon"
            className="-ml-1"
            onClick={toggleSidebar}
          >
            {isMobile ? <Menu className="h-5 w-5" /> : <PanelLeft />}
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </>
  );
}
