"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfFiles = Array.from(newFiles).filter(
      (file) => file.type === "application/pdf",
    );
    setFiles((prev) => [...prev, ...pdfFiles].slice(0, 10));
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
    setFiles((prev) => prev.filter((_, i) => i !== index));
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

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files to merge");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to merge PDFs");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to merge PDFs");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen min-h-[100dvh] w-full flex-col bg-[#f6f6f8] dark:bg-[#101622]">
      <div className="flex flex-1 flex-col w-full max-w-4xl mx-auto px-5 sm:px-8 md:px-10">
        <header className="flex items-center border-b border-gray-200 dark:border-gray-800 py-4 sm:py-5">
          <div className="flex items-center gap-2.5 text-gray-900 dark:text-gray-100">
            <div className="size-5 sm:size-6 text-primary">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight">
              {title}
            </h2>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center py-8 sm:py-12 md:py-16">
          <Card className="w-full border-0 shadow-none bg-transparent">
            <CardHeader className="text-center px-0 pb-6 sm:pb-8">
              <CardTitle className="text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
                Merge PDF Files <br />
                Easily & Free
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mt-3 sm:mt-4 px-2">
                {descriptions[0]}
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                {descriptions[1]}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <Card
                className={`flex flex-col items-center gap-4 sm:gap-6 border-2 border-dashed rounded-xl px-4 sm:px-6 py-8 sm:py-12 bg-white dark:bg-gray-900/50 shadow-sm cursor-pointer transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 dark:border-gray-600 hover:border-primary/50"
                }`}
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3 px-2">
                  <span className="material-symbols-outlined text-primary text-5xl sm:text-6xl">
                    upload_file
                  </span>
                  <p className="text-gray-900 dark:text-gray-100 text-base sm:text-lg font-bold text-center">
                    Drag & Drop your PDFs here
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">
                    Maximum file size: 50MB. Maximum files: 10.
                  </p>
                </div>
                <Button
                  type="button"
                  className="h-10 sm:h-12 px-6 sm:px-8 bg-primary text-white text-sm sm:text-base font-bold rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Select PDF Files
                </Button>
              </Card>

              {files.length > 0 && (
                <div className="mt-5 sm:mt-6 space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {files.length} file{files.length > 1 ? "s" : ""} selected
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
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
                        className={`flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white dark:bg-gray-800 rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                          draggedIndex === index
                            ? "opacity-50 border-primary"
                            : dragOverIndex === index
                              ? "border-primary border-2 bg-primary/5"
                              : "border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <span className="material-symbols-outlined text-gray-400 text-base sm:text-lg cursor-grab shrink-0 hidden sm:block">
                            drag_indicator
                          </span>
                          <span className="material-symbols-outlined text-red-500 text-lg sm:text-xl shrink-0">
                            picture_as_pdf
                          </span>
                          <span className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate flex-1">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 hidden xs:block">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="shrink-0 text-gray-500 hover:text-red-500 p-1.5 sm:p-2 h-auto"
                          onClick={() => removeFile(index)}
                        >
                          <span className="material-symbols-outlined text-lg sm:text-xl">
                            close
                          </span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  {error && (
                    <p className="text-xs sm:text-sm text-red-500 text-center py-1">
                      {error}
                    </p>
                  )}
                  <Button
                    className="w-full h-10 sm:h-12 bg-primary text-white text-sm sm:text-base font-bold rounded-lg hover:bg-primary/90 transition-colors mt-3 sm:mt-4 disabled:opacity-50"
                    onClick={handleMerge}
                    disabled={isLoading || files.length < 2}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined animate-spin text-lg sm:text-xl">
                          progress_activity
                        </span>
                        Merging...
                      </span>
                    ) : (
                      `Merge ${files.length} PDF${files.length > 1 ? "s" : ""}`
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-4 sm:py-6 mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              © 2024 PDF Merger. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                Terms
              </a>
              <a
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                Privacy
              </a>
              <a
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
