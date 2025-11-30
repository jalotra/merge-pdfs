import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const title = "Document Merger";
  const descriptions = [
    "Combine multiple PDFs into a single document in seconds",
    "Simple, secure, and no registration required.",
  ];
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101622] overflow-x-hidden">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex items-center whitespace-nowrap border-b border-gray-200 dark:border-gray-800 py-4">
            <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
              <div className="size-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h2>
            </div>
          </header>

          <main className="flex flex-1 flex-col items-center justify-center py-12 sm:py-20">
            <Card className="w-full max-w-3xl border-0 shadow-none bg-transparent mx-auto">
              <CardHeader className="text-center px-0">
                <CardTitle className="text-gray-900 dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl md:text-6xl">
                  Merge PDF Files <br />
                  Easily & Free
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal leading-relaxed mt-4">
                  {descriptions[0]}
                  <br />
                  {descriptions[1]}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-10 px-0">
                <Card className="flex flex-col items-center gap-6 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl px-6 py-14 bg-white dark:bg-gray-900/50 shadow-sm">
                  <div className="flex flex-col items-center gap-3 max-w-md">
                    <span className="material-symbols-outlined text-primary text-6xl">upload_file</span>
                    <p className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                      Drag & Drop your PDFs here
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal text-center">
                      Maximum file size: 50MB. Maximum number of files: 10.
                    </p>
                  </div>
                  <Button className="h-12 px-8 bg-primary text-white text-base font-bold rounded-lg hover:bg-primary/90 transition-colors">
                    Select PDF Files
                  </Button>
                </Card>
              </CardContent>
            </Card>
          </main>

          <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 PDF Merger. All rights reserved.</p>
              <div className="flex gap-6">
                <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
                <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" href="#">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
