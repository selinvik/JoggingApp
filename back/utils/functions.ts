import bcrypt from 'bcrypt';

export function generatePasswordHash(password: string): Promise<string>{
  return bcrypt.genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt)
        .then((hash) => {
          return hash;
        })
        .catch(() => null);
    })
    .catch(() => null);
}