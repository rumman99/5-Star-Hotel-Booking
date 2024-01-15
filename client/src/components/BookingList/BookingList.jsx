import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const BookingList = () => {
    const [bookingList, setBookingList]= useState([]);
    const [userInfo, setUserInfo]= useContext(userContext);

/// Get Method to View Booking List from DB/////
    useEffect(()=>{
        const bookingListUi= async ()=>{
            const fetching= await fetch('http://localhost:3333/bookingList?email='+userInfo.email, 
            {
                method:'GET',
                headers: {'Content-Type': 'application/json', authorization: `Bearer ${sessionStorage.getItem('token')}`}
            });
            const data= await fetching.json();
            setBookingList(data);
        }
        bookingListUi();
    },[])

    return (
        <div>
            {
                bookingList.map(bookings=> <li>Name: {bookings.user}, Category: {bookings.category} Room, Check In: {new Date(bookings.checkInDate).toDateString('dd/MM/yyyy')}, Check Out: {new Date(bookings.checkOutDate).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default BookingList;