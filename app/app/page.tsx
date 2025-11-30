export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101622] group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-5xl flex-1 px-4 sm:px-6 lg:px-8">
            <header className="flex items-center whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 px-2 sm:px-6 lg:px-10 py-3">
              <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
                <div className="size-6 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em]">PDF Merger</h2>
              </div>
            </header>

            <main className="flex flex-col items-center py-16 sm:py-24 text-center">
              <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
                <h1 className="text-gray-900 dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl md:text-6xl">
                  Merge PDF Files Easily & Free
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-normal leading-normal">
                  Combine multiple PDFs into a single document in seconds. Simple, secure, and no registration required.
                </p>
              </div>
              <div className="w-full max-w-3xl mt-12">
                <div className="flex flex-col p-4">
                  <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 px-6 py-14 bg-white/50 dark:bg-black/20">
                    <div className="flex max-w-[480px] flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-5xl">upload_file</span>
                      <p className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Drag & Drop your PDFs here</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal max-w-[480px] text-center">Maximum file size: 50MB. Maximum number of files: 10.</p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                      <span className="truncate">Select PDF Files</span>
                    </button>
                  </div>
                </div>
              </div>
            </main>

            <section className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
                <h2 className="text-gray-900 dark:text-gray-100 tracking-tight text-3xl font-bold leading-tight sm:text-4xl">
                  Why use our PDF Merger?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base font-normal leading-normal">
                  Our tool is designed to be the simplest way to combine your documents, with features that prioritize your workflow.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 p-6 flex-col items-start text-left">
                  <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">Fast & Efficient</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Your files are processed in seconds, so you can get back to what matters.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 p-6 flex-col items-start text-left">
                  <span className="material-symbols-outlined text-primary text-3xl">shield</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">Secure & Private</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">We delete all files from our servers after one hour. Your privacy is guaranteed.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 p-6 flex-col items-start text-left">
                  <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">High-Quality Output</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">Maintain the original quality of your PDFs without any compression or loss.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col justify-end gap-6 px-4 py-20 sm:px-10">
              <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
                <h2 className="text-gray-900 dark:text-gray-100 tracking-tight text-3xl font-bold leading-tight sm:text-4xl">
                  Ready to merge your files?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base font-normal leading-normal">Get started now. No account needed.</p>
              </div>
              <div className="flex flex-1 justify-center mt-4">
                <div className="flex justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] grow">
                    <span className="truncate">Merge PDFs Now</span>
                  </button>
                </div>
              </div>
            </section>

            <footer className="w-full border-t border-gray-200 dark:border-gray-800 mt-16 py-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 PDF Merger. All rights reserved.</p>
                <div className="flex gap-6">
                  <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">Terms of Service</a>
                  <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">Privacy Policy</a>
                  <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">Contact</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
