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

import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, username, password)
            .then((user: any) => {
                if (user) navigate("/");
                else setError("No user exists with these credentials.");
            })
            .catch((err: any) => {
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
                        <Badge tone="lilac" tilt>
                            Welcome back
                        </Badge>
                        <Title>Sign in</Title>
                        <Subtitle>Pick up where you left off.</Subtitle>
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
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button type="submit" size="lg">
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                    </Card>

                    <Text className="auth-switch">
                        New to Thirds? <Link to="/signup">Create an account</Link>
                    </Text>
                </Stack>
            </Container>
        </Page>
    );
}