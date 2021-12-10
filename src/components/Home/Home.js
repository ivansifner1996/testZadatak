import React, {useEffect, useState} from "react";
import './Home.css';
import Pagination from '../Pagination/Pagination';
import Artikl from "../Artikl/Artikl";
import firebaseService from "../../backend/firebaseService";

const Home = () => {
    const [artikli, setArtikli] = useState([]);
    useEffect(() => {
        fetchRecords();
    }, [])
    
    const fetchRecords = async() => {
        const items = await firebaseService.getAll();
        console.log(JSON.stringify(items));
        items.forEach(artikl => {
            console.log(artikl.name);
        })
        
        setArtikli(...artikli, items);
        
    }
    
   /*
    const artikli = [{
        "id" : 1,
        "name" : "Smart Hub",
        "price" : 49.99,
        "quantity" : 1,
    },
    {
        "id" : 2,
        "name" :"Motion Sensor",
        "price" : 24.99,
        "quantity": 3,
    },
    {
        "id" : 3,
        "name" : "Wireless Camera",
        "price" : 99.99,
        "quantity": 1,
    },
    {
        "id" : 4,
        "name" : "Smoke Sensor",
        "price" : 19.99,
        "quantity": 2,
    },
    {
        "id" : 5,
        "name" : "Water Leak Sensor",
        "price" : 14.99,
        "quantity": 1,
    },
    {
        "id" : 6,
        "name" : "f",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 7,
        "name" : "g",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 8,
        "name" : "h",
        "price" : 128.1,
        "quantity" : 1,
    },
    {
        "id" : 9,
        "name" :"i",
        "price" : 140.22,
        "quantity": 2,
    },
    {
        "id" : 10,
        "name" : "j",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 11,
        "name" : "k",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 12,
        "name" : "l",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 13,
        "name" : "m",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 14,
        "name" : "n",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 15,
        "name" : "o",
        "price" : 128.1,
        "quantity" : 1,
    },
    {
        "id" : 16,
        "name" :"p",
        "price" : 140.22,
        "quantity": 2,
    },
    {
        "id" : 17,
        "name" : "q",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 18,
        "name" : "r",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 19,
        "name" : "s",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 20,
        "name" : "t",
        "price" : 1020.00,
        "quantity": 3,
    },
    {
        "id" : 21,
        "name" : "u",
        "price" : 1020.00,
        "quantity": 3,
    }

]
*/
    return(
        <div className="allItems">
            <div className="sviArtiki">
                {artikli?
                <Pagination
                    RenderComponent = {Artikl}
                    data = {artikli}
                    pageLimit={5}
                    dataLimit={5}
                />
                 : <p>dsfdfssdf</p>}
            </div>
        </div>
    )
}

export default Home;