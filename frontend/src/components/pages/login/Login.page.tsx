import LoginForm from '@/features/login/components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-1 items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-muted-foreground">Введите ваши данные для входа</p>
        </div>
        <div className={'flex items-center justify-center'}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
