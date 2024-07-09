import MapSelect from '@/components/MapSelect';

export default function Home() {
    return (
        <div className="min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">バス停留所-選択</h1>
            <MapSelect />
        </div>
    );
}