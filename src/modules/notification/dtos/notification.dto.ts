export interface PushNotificationDTO {
    title: string
    body: string
    tokens: string[]
    data?: object
    badge?: number
}

export interface PushNotificationRequestDTO {
    deviceCode: string
    tokenFireBase?: string
    userId: number
}
