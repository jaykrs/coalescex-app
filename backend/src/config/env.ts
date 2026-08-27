import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),

  databaseUrl: required("DATABASE_URL"),

  jwtAccessSecret: required("JWT_ACCESS_SECRET"),
  jwtRefreshSecret: required("JWT_REFRESH_SECRET"),
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",

  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",

  payu: {
    key: process.env.PAYU_MERCHANT_KEY ?? "",
    salt: process.env.PAYU_MERCHANT_SALT ?? "",
    baseUrl: process.env.PAYU_BASE_URL ?? "https://test.payu.in/_payment",
    successUrl: process.env.PAYU_SUCCESS_URL ?? "http://localhost:3000/checkout/success",
    failureUrl: process.env.PAYU_FAILURE_URL ?? "http://localhost:3000/checkout/failure",
  },
};
