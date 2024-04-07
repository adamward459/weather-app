export function getEnv(key: string): string {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`env ${key} is not defined`);
  }
  return value as string;
}

export const storageKey = getEnv('VITE_STORAGE_KEY');