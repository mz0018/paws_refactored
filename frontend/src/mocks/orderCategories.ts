export const ORDER_CATEGORIES = [
    'pending',
    'completed',
] as const

export type OrderCategory = typeof ORDER_CATEGORIES[number]