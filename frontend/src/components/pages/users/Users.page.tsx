import Sidebar from '@/components/layout/sidebar/components/Sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import Users from '@/features/users/components/Users';

const UsersPage = () => {
  return (
    <>
      <Sidebar />
      <SidebarInset>
        <Users />
      </SidebarInset>
    </>
  );
};

export default UsersPage;
