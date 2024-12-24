import React from "react"
import { Link } from 'react-router-dom';
import '../style/head.css'


const Head: React.FC = () => {
    return (
        <div className="head-container">
            <div className="head-items">
                <div className="head-item-info" >
                    <Link to="/" className="custom-link">
                        Главная
                    </Link>
                    <Link to="/list" className="custom-link">
                        Список тестов
                    </Link>
            </div> 
                <Link to="/profile" className="custom-link">
                    <img className="img-user" src="/img/user.png" alt="" />
                </Link>
            </div>
            

        </div>
    )
}

export default Head