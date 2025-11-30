"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  const title = "Document Merger";
  const descriptions = [
    "Combine multiple PDFs into a single document in seconds",
    "Simple, secure, and no registration required.",
  ];

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfFiles = Array.from(newFiles).filter(file => file.type === "application/pdf");
    setFiles(prev => [...prev, ...pdfFiles].slice(0, 10));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleFileDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleFileDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newFiles = [...files];
    const [draggedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);
    setFiles(newFiles);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleFileDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

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
                <Input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <Card
                  className={`flex flex-col items-center gap-6 border-2 border-dashed rounded-xl px-6 py-14 bg-white dark:bg-gray-900/50 shadow-sm cursor-pointer transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 dark:border-gray-600 hover:border-primary/50"
                  }`}
                  onClick={() => inputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="flex flex-col items-center gap-3 max-w-md">
                    <span className="material-symbols-outlined text-primary text-6xl">upload_file</span>
                    <p className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                      Drag & Drop your PDFs here
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal text-center">
                      Maximum file size: 50MB. Maximum number of files: 10.
                    </p>
                  </div>
                  <Button
                    type="button"
                    className="h-12 px-8 bg-primary text-white text-base font-bold rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                  >
                    Select PDF Files
                  </Button>
                </Card>

                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {files.length} file{files.length > 1 ? "s" : ""} selected
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Drag to reorder
                      </p>
                    </div>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          draggable
                          onDragStart={(e) => handleFileDragStart(e, index)}
                          onDragOver={(e) => handleFileDragOver(e, index)}
                          onDrop={(e) => handleFileDrop(e, index)}
                          onDragEnd={handleFileDragEnd}
                          className={`flex items-center justify-between gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                            draggedIndex === index
                              ? "opacity-50 border-primary"
                              : dragOverIndex === index
                              ? "border-primary border-2 bg-primary/5"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="material-symbols-outlined text-gray-400 text-lg cursor-grab">drag_indicator</span>
                            <span className="material-symbols-outlined text-red-500 text-xl">picture_as_pdf</span>
                            <span className="text-sm text-gray-900 dark:text-gray-100 truncate">{file.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 text-gray-500 hover:text-red-500"
                            onClick={() => removeFile(index)}
                          >
                            <span className="material-symbols-outlined text-xl">close</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full h-12 bg-primary text-white text-base font-bold rounded-lg hover:bg-primary/90 transition-colors mt-4">
                      Merge {files.length} PDF{files.length > 1 ? "s" : ""}
                    </Button>
                  </div>
                )}
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
