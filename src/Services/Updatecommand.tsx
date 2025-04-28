import { useState } from "react";
import axios from "axios";

function Updatecommand() {
    const [file, setFile] = useState<File | null>(null); // Type File or null for file state
    const [uploading, setUploading] = useState<boolean>(false); // Type boolean for uploading state
    const [progress, setProgress] = useState<number>(0); // Type number for progress state
    const [message, setMessage] = useState<string>(""); // Type string for message state

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]; // Safe access to the first file
        if (selectedFile) {
            setFile(selectedFile);
            setMessage("");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // "file" is field name expected by the backend

        try {
            setUploading(true);
            const response = await axios.post(
                "http://localhost:3000/api/import2",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total!
                        );
                        setProgress(percentCompleted);
                    },
                }
            );
            setMessage("File uploaded successfully!");
            console.log(response.data);
        } catch (error) {
            setMessage("Error uploading file. Try again!");
            console.error(error);
        } finally {
            setUploading(false);
            setProgress(0);
            setFile(null);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">File Upload For Updates Commands</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
                onClick={handleUpload}
                disabled={uploading}
                className={`${
                    uploading ? "bg-blue-300" : "bg-blue-500"
                } text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300`}
            >
                {uploading ? `Uploading ${progress}%` : "Upload"}
            </button>
            <br />
            {message && (
                <p className="mt-4 text-center text-lg text-gray-800">{message}</p>
            )}
        </div>
    );
}

export default Updatecommand;
