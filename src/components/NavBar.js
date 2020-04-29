import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <ul>
            <li>
                <Link to="/login" className="link">Login</Link>
            </li>
            <li>
                <Link to="/questions" className="link">Questions</Link>
            </li>
            <li>
                <Link to="/answers" className="link">Answers</Link>
            </li>
        </ul>
    )
}

export default NavBar
