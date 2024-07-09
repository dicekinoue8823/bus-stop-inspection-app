import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ImageDisplayProps {
    file: File;
    onBack: () => void;
    onUpload: (file: File) => void;
    onUploadSuccess: () => void; // 新しいコールバックプロップ
}
const ImageDisplay: React.FC<ImageDisplayProps> = ({ file, onBack, onUpload, onUploadSuccess }) => {

// const ImageDisplay: React.FC<ImageDisplayProps> = ({ file, onBack, onUpload }) => {

    const handleUploadClick = () => {
        onUpload(file);
        onUploadSuccess();
    };
    const imageUrl = URL.createObjectURL(file);

    return (
        <Card className="flex flex-col items-center">
            <img src={imageUrl} alt={file.name} className="max-w-full max-h-full" />
            <div className="mt-4">
                <Button onClick={onBack}>Back</Button>
                {/*<Button onClick={() => onUpload(file)} className="ml-4">Upload</Button>*/}
                <Button onClick={handleUploadClick} className="ml-4">Upload</Button>
            </div>
        </Card>
    );
};

export default ImageDisplay;
