import { useState } from "react";
import { useNavigate } from "react-router";
import {
    Badge,
    BulletList,
    Button,
    Card,
    Container,
    Input,
    InlineForm,
    LabeledCard,
    Page,
    Stack,
    Subtitle,
    Text,
    Title,
} from "../components/Components"; // adjust to wherever you put components.tsx
import "./styles/welcome.css";

export default function Welcome() {
    const [zipInput, setZipInput] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submitZip = () => {
        const zip = zipInput.trim();
        if (!/^\d{5}$/.test(zip)) {
            setError("Please enter a 5-digit zip code.");
            return;
        }
        setError("");
        navigate(`/map?zip=${zip}`);
    };

    return (
        <Page>
            <Container narrow>
                <Stack gap="lg">
                    {/* Hero */}
                    <header className="welcome-hero">
                        <Badge tone="tangerine" tilt>
                            Free to hang out
                        </Badge>
                        <Title>Welcome to Thirds</Title>
                        <Subtitle>Find third spaces in your community!</Subtitle>
                    </header>

                    {/* Call to action */}
                    <Card tone="paper" className="welcome-cta">
                        <Text>To find third spaces near you, enter your zip code:</Text>
                        <InlineForm
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitZip();
                            }}
                        >
                            <Input
                                type="text"
                                inputMode="numeric"
                                autoComplete="postal-code"
                                placeholder="Zip code"
                                aria-label="Zip code"
                                maxLength={5}
                                value={zipInput}
                                onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ""))}
                                error={error}
                            />
                            <Button type="submit" size="md">
                                Submit
                            </Button>
                        </InlineForm>
                    </Card>

                    {/* About */}
                    <LabeledCard label="What is Thirds?">
                        <Stack gap="md">
                            <Text>
                                Thirds is a website that helps people find Third spaces within their community. A
                                third space is a place to hang out, meet friends, and have fun without the
                                expectation of spending money.
                            </Text>
                            {/* More about questions can go here later, a BulletList or a few more Cards works well */}
                            <BulletList
                                items={[
                                    "A place that isn't home or work",
                                    "Somewhere to meet friends or make new ones",
                                    "No pressure to spend money",
                                ]}
                            />
                        </Stack>
                    </LabeledCard>
                </Stack>
            </Container>
        </Page>
    );
}