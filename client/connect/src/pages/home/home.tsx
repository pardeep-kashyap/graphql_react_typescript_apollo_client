import { useQuery } from "@apollo/client";
import Post from "../../components/Post/Post";
import { GET_QUOUTES_BY_USER } from "../../gqlOperations/queries";
import './home.css'

const Home = () => {
    const { data, error, loading } = useQuery(GET_QUOUTES_BY_USER, { variables: { by: localStorage.getItem('id') } })


    if (loading) return (<div>'Loading...'</div>)
    if (error) return (<div>`Error! ${error.message}`;</div>
    )


    return (
        <div className="post-container">
            {data?.quote.map((quote: any, index: number) => (
                <Post {...quote} />
            ))
            }
        </div >
    )
}
export default Home;