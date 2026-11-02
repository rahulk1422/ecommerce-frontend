import { Link } from "react-router-dom";
import Button from "../components/common/Button";

function NotFound(){
    return(
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <p className="text-6xl font-bold text-primary mb-4">404</p>
            <h1 className="text-2xl font-bold text-dark mb-2">Page not found</h1>
            <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>
            <Link to="/">
                 <Button>Go to Home</Button>
            </Link>
        </div>
    )
}

export default NotFound;