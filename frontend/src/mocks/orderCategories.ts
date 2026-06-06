export const ORDER_CATEGORIES = [
    'pending',
    'delivered',
] as const

export type OrderCategory = typeof ORDER_CATEGORIES[number]