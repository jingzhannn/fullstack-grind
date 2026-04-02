import { useEffect, useState } from "react"
import React from 'react'
import './allbooks.css'

const Allbooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(()=> {
        const fetchBooks = async () => {
            try{
                const res = await fetch(`http://localhost:3000/allbooks`);
                const data = await res.json();
                setBooks(data);
            } catch (err) {
                console.error("Error Fetching Books: ", err);
            }
        }

        fetchBooks();
    }, [])

    return(
        <section className="books-page">
            <div className="books-header">
                <h1>All Books</h1>
                <p>Explore the complete collection.</p>
            </div>

            <div className="books-grid">
                {books.map((book) => {
                    return (
                        <article className="book-card" key={book.id ?? `${book.title}-${book.author}`}>
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">by {book.author}</p>
                        </article>
                    )
                })}
            </div>
        </section>
    )
    
}

export default Allbooks