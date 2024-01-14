import React from 'react';
import Room from '../Room/Room';
import family from '../../images/Family.png'
import double from '../../images/Double.png'
import single from '../../images/single.png'

const Home = () => {
    const style = {
        display: 'flex',
        margin: '40px',
        justifyContent: 'space-evenly'
    }
    const rooms = [
        {
            title: 'Standard Single Room',
            description: 'Standard Single Rooms are designed in open -concept living area and have many facilities.',
            imgUrl: single,
            bed: 1,
            capacity: 1,
            bedType: 'Single',
            avatar: 'S',
            price: 119
        },
        {
            title: 'Couple Power Room',
            description: 'Superior Double Rooms are perfectly equipped for traveling couples or friends.',
            imgUrl: double,
            bed: 1,
            capacity: 2,
            bedType: 'Double',
            avatar: 'D',
            price: 149
        },
        {
            title: 'Family Capacity Room',
            description: ' Have lots of in-room facilities and are designed in open-concept living area.',
            imgUrl: family,
            bed: 2,
            capacity: 4,
            bedType: 'Family',
            avatar: 'F',
            price: 199
        }
    ]
    return (
        <div>
            <div style={{textAlign: "center", color:'#3f51b5'}}><h1>Choose Your Preferable Room NOW</h1></div>
            <div style={style}>
            {
                rooms.map(room => <Room key={room.bedType} room={room}></Room>)
            }
            </div>
        </div>
    );
};

export default Home;