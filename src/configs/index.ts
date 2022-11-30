const env = process.env

export interface Config {
    port: string
    dbUri: string
    redisUri: string
    secretKey: string
    frankieUrl: string
    frankieApiKey: string
    frankieCusId: string
    genwebUrl: string
    racebookUrl: string
    genwebClientKey: string
    genwebSecretKey: string
    genwebClientIOSKey: string
    genwebSecretIOSKey: string
    genwebClientAndroidKey: string
    genwebSecretAndroidKey: string
    awsKeyId: string
    awsSecretKey: string
    awsRegion: string
    awsSqsUrl: string
    awsBucketName: string
    awsS3Location: string
    awsXrayDaemonAddress: string
    awsXrayTracingName: string
    smtpEndpoint: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    smtpSender: string
    siteUrl: string
    fcmUri: string
    fcmServerKey: string
    sendbirdAppId: string
    sendbirdApiKey: string
    basicAuthPassword: string
    googleCaptchaSecretKey: string
}

export const config: Config = {
    port: env.PORT,
    dbUri: env.DB_URI,
    redisUri: env.REDIS_URI,
    secretKey: env.SECRET_KEY,
    frankieUrl: env.FRANKIE_URL,
    frankieApiKey: env.FRANKIE_API_KEY,
    frankieCusId: env.FRANKIE_CUS_ID,
    genwebUrl: env.GENWEB_URL,
    racebookUrl: env.RACEBOOK_URL,
    genwebClientKey: env.GENWEB_CLIENT_KEY,
    genwebSecretKey: env.GENWEB_SECRET_KEY,
    genwebClientIOSKey: env.GENWEB_CLIENT_IOS_KEY,
    genwebSecretIOSKey: env.GENWEB_SECRET_IOS_KEY,
    genwebClientAndroidKey: env.GENWEB_CLIENT_ANDROID_KEY,
    genwebSecretAndroidKey: env.GENWEB_SECRET_ANDROID_KEY,
    awsKeyId: env.AWS_ACCESS_KEY_ID,
    awsSecretKey: env.AWS_SECRET_ACCESS_KEY,
    awsRegion: env.AWS_REGION,
    awsSqsUrl: env.AWS_SQS_URL,
    awsBucketName: env.AWS_BUCKET_NAME,
    awsS3Location: env.AWS_S3_LOCATION,
    awsXrayDaemonAddress: env.AWS_XRAY_DAEMON_ADDRESS,
    awsXrayTracingName: env.AWS_XRAY_TRACING_NAME,
    smtpEndpoint: env.SMTP_ENDPOINT,
    smtpPort: env.SMTP_PORT,
    smtpUsername: env.SMTP_USERNAME,
    smtpPassword: env.SMTP_PASSWORD,
    smtpSender: env.SMTP_SENDER,
    siteUrl: env.SITE_URL,
    fcmUri: env.FCM_URI,
    fcmServerKey: env.FCM_SERVER_KEY,
    sendbirdAppId: env.SENDBIRD_APP_ID,
    sendbirdApiKey: env.SENDBIRD_API_KEY,
    basicAuthPassword: env.BASIC_AUTH_PASSWORD,
    googleCaptchaSecretKey: env.GOOGLE_CAPTCHA_SECRET_KEY,
}

export const isProduction = env.NODE_ENV === 'production'
