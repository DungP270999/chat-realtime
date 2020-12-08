import React, {useState} from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBRow} from "mdbreact";

const CenterLayout = React.memo(({message, setMessage}) => {
    const [messageTemp, setMessageTemp] = useState('');
    const handleSendMessage = (e, messageTemp) => {
        e.preventDefault();
        if (messageTemp === '') return;
        setMessage(prev => {
            return [...prev, messageTemp]
        });
        setMessageTemp('');
    };
    return (
        <MDBCol
            className='center-layout p-0'
            size={6}
        >
            <MDBRow className='center-layout_header d-flex align-items-center m-0 py-2 px-2'>
                <div className='center-layout_image-frame mr-1'>
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkybW14kISa6-ACbGMlH4yASSX5Qsqmuu5qw&usqp=CAU'
                        className='img-fluid'
                        alt='image'
                    />
                </div>
                <div className='d-flex flex-column justify-content-center ml-1'>
                    <b>Tinasoft-frontend</b>
                </div>
            </MDBRow>
            <MDBRow className='center-layout_content m-0'>
                <MDBCol size={6}>

                </MDBCol>
                <MDBCol size={6}>
                    {message.map((item, index) => (
                        <MDBRow key={index} className='d-flex flex-row-reverse mt-2'>
                            <div className='center-layout_message-frame p-2 mr-3 rounded'>
                                {item}
                            </div>
                        </MDBRow>
                    ))}
                </MDBCol>
            </MDBRow>
            <form onSubmit={(e) => handleSendMessage(e, messageTemp)}>
                <MDBRow className='m-0'>
                    <input
                        className='center-layout_input form-control ml-2'
                        placeholder='Nhập tin nhắn...'
                        value={messageTemp}
                        onChange={(e) => setMessageTemp(e.target.value)}
                    />
                    <MDBBtn
                        className='my-0 p-0 ml-3'
                        color='link'
                        onClick={(e) => handleSendMessage(e, messageTemp)}
                    >
                        <MDBIcon
                            className='center-layout_btn-send'
                            type='submit'
                            icon="paper-plane"
                            size="2x"
                        />
                    </MDBBtn>
                </MDBRow>
            </form>
        </MDBCol>
    )
});

export default CenterLayout;
