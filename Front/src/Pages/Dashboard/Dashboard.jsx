import React, {useEffect, useState} from "react";
import {MDBRow} from "mdbreact";
import LeftLayout from "./LeftLayout";
import CenterLayout from "./CenterLayout";
import RightLayout from "./RightLayout";
import io from "socket.io-client";

const socket = io('http://localhost:8888', {transports: ['websocket', 'polling', 'flashsocket']});

const Dashboard = React.memo(() => {
    const [listChat, setListChat] = useState([
        {
            name: 'Tinasoft-frontend1',
            time: '11:27',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkybW14kISa6-ACbGMlH4yASSX5Qsqmuu5qw&usqp=CAU'
        },
        {
            name: 'Tinasoft-frontend2',
            time: '11:27',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkybW14kISa6-ACbGMlH4yASSX5Qsqmuu5qw&usqp=CAU'
        },
        {
            name: 'Tinasoft-frontend3',
            time: '11:27',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkybW14kISa6-ACbGMlH4yASSX5Qsqmuu5qw&usqp=CAU'
        },
        {
            name: 'Tinasoft-frontend4',
            time: '11:27',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkybW14kISa6-ACbGMlH4yASSX5Qsqmuu5qw&usqp=CAU'
        },
    ]);
    const [message, setMessage] = useState([]);
    const [isChooseChat, setIsChooseChat] = useState(-1);

    useEffect(() => {

    }, []);

    return (
        <MDBRow className='m-0'>
            <LeftLayout
                listChat={listChat}
                isChooseChat={isChooseChat}
                setIsChooseChat={setIsChooseChat}
            />
            <CenterLayout
                message={message}
                setMessage={setMessage}
            />
            <RightLayout/>
        </MDBRow>
    );
});

export default Dashboard;
