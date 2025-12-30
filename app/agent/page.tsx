export default async function AgentPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Agen</h1>
                        <p className="text-gray-500 dark:text-gray-400">Pantau dan respon percakapan user</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status: Aktif</span>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden min-h-[600px] flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Belum ada percakapan aktif</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        Chat yang membutuhkan bantuan agen akan muncul di sini secara realtime.
                    </p>
                </div>
            </div>
        </div>
    );
}
