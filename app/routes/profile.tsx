import { useState, useEffect } from 'react';
import {
    BackButton,
    Page,
    Container,
    Stack,
    Card,
} from '~/components/Components'
import auth from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import "./styles/profile.css";

export default function Profile() {
    const [user, setUser]: any = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
        });
    }, []);

    return (
        <Page>
            <Container narrow>
                <Stack gap="lg">
                    <div>
                        <BackButton>Back</BackButton>
                    </div>

                    <Card tone="paper" >
                        <Stack gap="md">
                            <p>Profile Page</p>
                            {
                                user.email ? <p>{user.email}</p> : <></>
                            }
                        </Stack>
                    </Card>
                </Stack>
            </Container>
        </Page>
    )
}