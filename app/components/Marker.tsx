import { useEffect, useRef, useState } from "react";
import "./component-styles/marker.css";

type MarkerProps = {
    // Passed by google-map-react to position the marker
    lat: number;
    lng: number;
    name: string;
    onClick?: () => void;
};

function Marker({ name, onClick }: MarkerProps) {
    const [popping, setPopping] = useState(false);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const handleClick = () => {
        // Restart the animation even if clicked twice quickly
        setPopping(false);
        window.requestAnimationFrame(() => setPopping(true));
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setPopping(false), 700);
        onClick?.();
    };

    return (
        <button
            type="button"
            className={`marker${popping ? " marker--popping" : ""}`}
            onClick={handleClick}
            aria-label={name}
        >
            <span className="marker-ring" />
            <span className="marker-ground" />
            <span className="marker-pin" />
            <span className="marker-label">{name}</span>
        </button>
    );
}

export default Marker;