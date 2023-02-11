import { useMutation, useQuery } from "@apollo/client";
import { Box, TextField, Button, Grid, Icon, IconButton, Menu, MenuItem, Typography, AppBar, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_QUOTE } from "../../gqlOperations/queries";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const AddNew = () => {
    const [createQuote, quotesCallback] = useMutation(CREATE_QUOTE)
    const navigate = useNavigate()
    if (quotesCallback?.loading) return (<div>'Loading...'</div>)
    if (quotesCallback.error) return (<div>`Error! ${quotesCallback?.error.message}`;</div>
    )

    if (quotesCallback.data) {
        navigate('/')
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        createQuote({
            variables: {
                text: formData.get('text'),
            }
        });
    };


    return (
        <div>
            <AppBar position="static" >
                <Container maxWidth="xl">
                    <div className="more-icon">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => navigate('/')}
                        >
                            <ArrowBackIcon />
                        </IconButton>

                    </div>
                </Container>
            </AppBar>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    name="text"
                    autoComplete="text"
                    placeholder="Add New Quote"
                    autoFocus
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add
                </Button>

            </Box>
        </div >
    )
}
export default AddNew;
