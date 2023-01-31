import { useMutation, useQuery } from "@apollo/client";
import { Box, TextField, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { CREATE_QUOTE, GET_QUOUTES_BY_USER } from "../../gqlOperations/queries";

const Home = () => {
    const { data, error, loading } = useQuery(GET_QUOUTES_BY_USER, { variables: { by: localStorage.getItem('id') } })
    const [createQuote, quotesCallback] = useMutation(CREATE_QUOTE)


    if (loading) return (<div>'Loading...'</div>)
    if (error) return (<div>`Error! ${error.message}`;</div>
    )

    if (quotesCallback.data) {
        location.reload();
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

    const AddNew = () => (<div>
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

    </div>)


    return (
        <div>
            <AddNew />
            {data?.quote.map((quote: any, index: number) => (<blockquote key={index}>
                <h5> {quote?.text}</h5>
                <p style={{ textAlign: 'right', fontSize: '10px' }}>~{quote?.by?.firstName}</p>
            </blockquote>))}

        </div>
    )
}
export default Home;