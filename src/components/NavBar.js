import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <ul>
            <li>
                <Link to="/quiz" className="link">Quiz</Link>
            </li>
        </ul>
    )
}

export default NavBar
