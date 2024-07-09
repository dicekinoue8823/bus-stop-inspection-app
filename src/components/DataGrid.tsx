import React, {useEffect, useState} from 'react';

interface DataGridProps {
    files: File[];
    onEdit: (file: File) => void;
    onFileRemove: (file: File) => void;
}

const DataGrid: React.FC<DataGridProps> = ({ files, onEdit, onFileRemove }) => {
    // const [isClient, setIsClient] = useState(false);
    //
    // useEffect(() => {
    //     setIsClient(true);
    // }, []);
    //
    // if (!isClient) {
    //     return null;
    // }
    return (
        <table className="min-w-full divide-y divide-gray-300 mt-4">
            <thead>
            <tr>
                <th className="px-6 py-3 bg-gray-100">ファイル名</th>
                {/*<th className="px-6 py-3 bg-gray-50">Category</th>*/}
                {/*<th className="px-3 py-3 bg-gray-50">View</th>*/}
                <th className="px-3 py-3 bg-gray-100">削除</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file, index) => (
                <tr key={file.name} className={index % 2 === 0 ? 'bg-cyan-50' : 'bg-gray-50'}>
                    {/*<td className="px-6 py-4">{file.name}</td>*/}
                    <td className="px-3 py-3">
                        <button onClick={() => onEdit(file)}
                                className="text-indigo-900 hover:text-orange-700">
                            {file.name}
                        </button>
                    </td>
                    {/*<td className="px-6 py-4">N/A</td>*/}
                    {/*<td className="px-6 py-4">N/A</td>*/}
                    {/*<td className="px-3 py-3">*/}
                    {/*    <button onClick={() => onEdit(file)} className="text-indigo-900 hover:text-orange-700">View*/}
                    {/*    </button>*/}
                    {/*</td>*/}
                    <td className="px-3 py-3">
                        <button onClick={() => onFileRemove(file)} className="text-indigo-300 hover:text-indigo-900">Del
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DataGrid;
