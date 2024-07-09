import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
    const inputRef = useRef(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            onFilesSelected(Array.from(files));
        }
        console.log(files)
    };

    const fileSelect = () => {
        console.log(inputRef.current);
        // @ts-ignore
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col gap-4">
            {/*<input type="file" multiple onChange={handleFileChange} />*/}
            <Input
                className="bg-cyan-400 hover:bg-cyan-600 border-none"
                type="file"
                // value="イメージファイル選択"
                multiple
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png " />
            {/*<Button onClick={fileSelect}>Select Files</Button>*/}
        </div>
    );
};

export default FileUpload;
