import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@material-ui/core';

const Book = () => {
    const [userInfo, setUserInfo]= useContext(userContext);
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const {bedType} = useParams();

    const [selectedDate, setSelectedDate] = useState({checkInDate:new Date(), checkOutDate:new Date()});

    const handleCheckIn=(date)=>{
        const newDate= {...selectedDate};
        newDate.checkInDate= date;
        setSelectedDate(newDate);
    }

    const handleCheckOut=(date)=>{
        const newDate= {...selectedDate};
        newDate.checkOutDate= date;
        setSelectedDate(newDate);
    }
    
//// Create Post method to Database for Bookings/////
    const handleBookRoomButton=()=>{
        const bookInfo= {user: userInfo.name, email: userInfo.email, checkInDate: selectedDate.checkInDate, checkOutDate: selectedDate.checkOutDate, category: bedType};

        const fetching= async ()=>{
            const res= await fetch('https://localhost:3333/booking',{
                method: 'POST',
                body: JSON.stringify(bookInfo),
                headers: {'Content-Type': 'application/json'}
            })
            const data= await res.json();
        }
        fetching()
    }

    return (
        <div style={{textAlign: 'center'}}>
            <div>
            <h1> Hello....<strong>{userInfo.name}</strong></h1>
            <h2>Let's book a {bedType} Room.</h2>
            <p>Want a <Link to="/home">different room?</Link> </p>
            </div>

            {userInfo.email && <Link to='/bookingList'>Check Your Booking List</Link>}

            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <span style={{color:'green', textDecoration:'underline'}}>CheckIn Date: <br></br>
                <DatePicker placeholderText='CheckIn Date' dateFormat="dd/MM/yyyy"
                    selectsStart
                    selected={selectedDate.checkInDate}
                    onChange={date => handleCheckIn(date)}
                    startDate={selectedDate.checkInDate}/></span>
                <span style={{color:'red', textDecoration:'underline'}}>CheckOut Date: <br></br>
                <DatePicker placeholderText='CheckOut Date' dateFormat="dd/MM/yyyy"
                    selectsEnd
                    selected={selectedDate.checkOutDate}
                    onChange={date => handleCheckOut(date)}
                    endDate={selectedDate.checkOutDate}
                    startDate={selectedDate.checkInDate}
                    minDate={selectedDate.checkInDate}/></span>
            </div>
            <br></br>
            <Button onClick={handleBookRoomButton} variant="contained" style={{color:'white', backgroundColor:'green'}}>Book Room</Button>
    
        </div>
    );
};

export default Book;