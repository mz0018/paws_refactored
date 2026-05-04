// import { useState } from 'react'

// type UpdateProductPayload = Partial<{
//     productName?: string
//     productDescription?: string
//     productPrice?: number
//     productCategory?: string
//     stock?: number
// }>

// export const useUpdateProduct = () => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const updateProduct = async (id: string, data: UpdateProductPayload) => {
//     setLoading(true)
//     setError(null)

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/admin/update-product/${id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(data),
//           credentials: "include"
//         }
//       )

//       if (!res.ok) throw new Error("Failed to update product")

//       return await res.json()
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return { updateProduct, loading, error }
// }