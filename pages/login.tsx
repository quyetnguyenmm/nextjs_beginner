import { authApi } from '../api-client';

export default function LoginPage() {
  async function handleLoginClick() {
    try {
      await authApi.login({
        username: 'test@gmail.com',
        password: 'Huy1234@',
      });
    } catch (error) {
      console.log('Fail to login: ', error);
    }
  }

  async function handleGetProfileClick() {
    try {
      await authApi.getProfile();
    } catch (error) {
      console.log('Fail to get profile: ', error);
    }
  }

  async function handleLogoutClick() {
    try {
      await authApi.logout();
    } catch (error) {
      console.log('Fail to logout: ', error);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
