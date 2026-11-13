export const Marker = ({ name }: { lat: number; lng: number; name: string}) => (
    <div className="marker" title={name} >
        📍
    </div>
);