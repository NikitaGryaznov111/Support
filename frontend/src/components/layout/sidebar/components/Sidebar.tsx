import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { LogOut, Menu } from 'lucide-react';
import SidebarNav from './SidebarNav';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes.config';

const Sidebar = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    navigate(ROUTES.registration);
  };
  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton size="lg" onClick={toggleSidebar}>
              <Menu className="size-5" />
              <span className="font-semibold">Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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

      <SidebarRail />
    </ShadcnSidebar>
  );
};

export default Sidebar;
