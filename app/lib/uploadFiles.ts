const uploadFiles = async (files: FileList) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  return response.json();
};
