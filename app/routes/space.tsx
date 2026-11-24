import { useSearchParams } from "react-router-dom";
import { DROP_POINTS } from "~/data/locations";
import './styles/space.css';
import { useLocation, useNavigate } from "react-router";

import { BulletList } from "~/components/Components";
 
export default function Space() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
 
    const id = Number(searchParams.get("id"));
    const space: any = DROP_POINTS.find(x => x.id === id);

    const goBack = () => {
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    const activities = (): string[] => {
        const active_description: string = space.activity_description;
        const description_array: string[] = active_description.split("Group:");

        return description_array;
    }
 
    const backButton = (
        <button type="button" className="space-back" onClick={goBack}>
            Back to map
        </button>
    );
 
    if (!space) {
        return (
            <div className="space-main-component">
                <p className="space-not-found">Space not found... try again.</p>
            </div>
        );
    }
 
    return (
        <div className="space-main-component">
            {backButton}
            <h1>{space.name}</h1>
            <p className="space-hours">{space.hours}</p>
            <p className="space-description">{space.description}</p>
            <div className="area-discussion">
                <p>What is there to do here?</p>
                <BulletList
                    items={[
                        activities()[0],
                        `Group: ${activities()[1]}`
                    ]}
                />
            </div>
        </div>
    );
}