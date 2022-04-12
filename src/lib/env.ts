export const {
  REDIS_URL,
  NODE_ENV,
  UMAMI_SERVER_NAME,
  NEXT_PUBLIC_UMAMI_SITE_ID: UMAMI_SITE_ID,
} = process.env;

export const IS_REDIS_ENABLED = REDIS_URL !== undefined;
export const IS_UMAMI_ENABLED = UMAMI_SERVER_NAME !== undefined;

export const IN_PRODUCTION = NODE_ENV === "production";
