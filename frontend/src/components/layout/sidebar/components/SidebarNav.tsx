import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SIDEBAR_ITEMS } from '../config/sidebar.config';
import { NavLink } from 'react-router-dom';

interface ISidebarNavProps {
  groupLabel?: string;
}
const SidebarNav = ({ groupLabel }: ISidebarNavProps) => {
  const userId = localStorage.getItem('userId') ?? '';

  return (
    <SidebarGroup>
      {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {SIDEBAR_ITEMS.map((item) => {
            const to =
              typeof item.to === 'function' ? item.to(userId) : item.to;

            return (
              <SidebarMenuItem key={item.id}>
                <NavLink to={to} end={item.end}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      className="w-full"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium ">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNav;
