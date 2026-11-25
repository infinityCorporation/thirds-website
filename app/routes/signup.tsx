import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    BackButton,
    Badge,
    Button,
    Card,
    Container,
    Input,
    Page,
    Stack,
    Subtitle,
    Text,
    Title,
} from "~/components/Components";
import "./styles/auth.css";
import { createUserWithEmailAndPassword } from "firebase/auth";

import auth from "../../firebase";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, username, password)
            .then((user) => {
                if (user) navigate("/");
            })
            .catch((err) => {
                console.log("There was an error: ", err);
            })
    };

    return (
        <Page>
            <Container narrow>
                <Stack gap="lg">
                    <div>
                        <BackButton>Back</BackButton>
                    </div>

                    <header className="auth-hero">
                        <Badge tone="tangerine" tilt>
                            Join the community
                        </Badge>
                        <Title>Sign up</Title>
                        <Subtitle>Create an account to start exploring third spaces.</Subtitle>
                    </header>

                    <Card tone="paper" className="auth-card">
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <Stack gap="md">
                                <Input
                                    label="Email"
                                    type="text"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button type="submit" size="lg">
                                    Create account
                                </Button>
                            </Stack>
                        </form>
                    </Card>

                    <Text className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </Text>
                </Stack>
            </Container>
        </Page>
    );
}