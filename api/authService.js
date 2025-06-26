const users = [
  {
    id: '1',
    fullName: 'Test User',
    email: 'test@example.com',
    password: 'Test123',
  },
];

const DELAY = 1000;

export const authService = {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve({
            user: userWithoutPassword,
            token:
              'simulated-jwt-token-' + Math.random().toString(36).substr(2),
          });
        } else {
          reject(new Error('E-posta veya şifre hatalı!'));
        }
      }, DELAY);
    });
  },
  register: () => {},
  logout: () => {
    return  new Promise((resolve, reject)=> {
        setTimeout(() => {
            resolve()
        }, 1000);
    })
  },
};
