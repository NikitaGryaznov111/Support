import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LogOut, PanelLeft } from 'lucide-react';
import SidebarNav from './SidebarNav';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes.config';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const navigate = useNavigate();
  const { toggleSidebar, isMobile, openMobile } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    navigate(ROUTES.registration);
  };
  return (
    <ShadcnSidebar collapsible="offcanvas">
      <SidebarHeader className="flex flex-row items-center justify-between gap-2">
        <span className="font-semibold">Support</span>
        {isMobile && openMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            onClick={toggleSidebar}
          >
            <PanelLeft />
          </Button>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarNav />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Выйти" onClick={handleLogout}>
              <LogOut />
              <span>Выйти</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
