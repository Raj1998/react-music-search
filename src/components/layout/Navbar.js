import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark mb-5" >
            <Link to="/" className="navbar-brand mb-0 h1 mx-auto">
                LyricFinder
            </Link>
        </nav>
    )
}
