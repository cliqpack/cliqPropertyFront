import React, { useState } from 'react';
import { Button } from 'reactstrap';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    //console.log(postsPerPage, totalPosts, paginate)
    //console.log(paginate.color)
    const pageNumbers = [];
    const [color, setColor] = useState("green")
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const Color = () => {
        console.log("Hello...............")
        setColor("green");
    }

    return (
        <nav style={{ textAlign: "right" }}>
            <ul className='pagination' >
                {pageNumbers.map(number => (
                    <li key={number} className='page-item' >
                        <a onClick={() => { paginate(number), Color() }} className='page-link'>
                            <span>{number}</span>
                        </a>
                    </li>
                ))}



            </ul>
        </nav>

    );
};

export default Pagination;