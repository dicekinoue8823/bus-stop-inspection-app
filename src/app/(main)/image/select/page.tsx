"use client";
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
// import FileList from '@/components/FileList';
import ImageDisplay from '@/components/ImageDisplay';
import DataGrid from '@/components/DataGrid';

const ImageHome: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFilesSelected = (newFiles: File[]) => {
        setFiles([...files, ...newFiles]);
    };

    const handleFileClick = (file: File) => {
        setSelectedFile(file);
    };

    const handleFileRemove = (fileToRemove: File) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    const handleUpload = (file: File) => {
        // アップロード処理をここに追加
        console.log('Uploading file:', file);
    };

    const handleUploadSuccess = () => {
        if (selectedFile) {
            handleFileRemove(selectedFile);
            setSelectedFile(null);
        }
    };
    return (
        <div className="container mx-3 p-4">
            {selectedFile ? (
                <ImageDisplay
                    file={selectedFile}
                    onBack={() => setSelectedFile(null)}
                    onUpload={handleUpload}
                    onUploadSuccess={handleUploadSuccess}
                />
            ) : (
                <>
                    <FileUpload onFilesSelected={handleFilesSelected} />
                    {/*<FileList*/}
                    {/*    files={files}*/}
                    {/*    onFileClick={handleFileClick}*/}
                    {/*    onFileRemove={handleFileRemove}*/}
                    {/*/>*/}
                    <DataGrid files={files}
                              onEdit={handleFileClick}
                              onFileRemove={handleFileRemove}
                    />
                </>
            )}
        </div>
    );
};

export default ImageHome;
