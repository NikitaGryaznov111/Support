import { FolderKanban, ListTodo, LucideIcon, User, Users } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  to: string | ((userId: string) => string);
  end?: boolean;
  badge?: number;
  children?: SidebarItem[];
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'all-users',
    label: 'Все пользователи',
    icon: Users,
    to: '/',
    end: true,
  },
  {
    id: 'my-page',
    label: 'Моя страница',
    icon: User,
    to: (userId: string) => `/${userId}`,
    end: true,
  },
  {
    id: 'my-tasks',
    label: 'Мои задачи',
    icon: ListTodo,
    to: (userId: string) => `/${userId}/tasks`,
  },
  {
    id: 'my-projects',
    label: 'Мои проекты',
    icon: FolderKanban,
    to: (userId: string) => `/${userId}/projects`,
  },
];
