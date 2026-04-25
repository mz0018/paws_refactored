export const Loader = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-80 bg-[#28282B] text-white flex flex-col">
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <span className="font-bold">Logo</span>
                    <div className="w-9" />
                </div>
                <nav className="flex-1 p-2" />
                <div className="p-4 border-t border-gray-700" />
            </div>
            <main className="flex-1 flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
            </main>
        </div>
    )
}