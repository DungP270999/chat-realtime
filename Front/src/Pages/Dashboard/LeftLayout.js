import React from "react";
import {MDBCard, MDBCol, MDBFormInline, MDBIcon, MDBRow} from "mdbreact";

const ChatItem = ({item, index, isChooseChat, setIsChooseChat}) => {
    return (
        <MDBCard
            className='history-chat d-flex justify-content-center py-1 px-2 mt-1'
            onClick={() => setIsChooseChat(index)}
        >
            <MDBRow className='m-0'>
                <div className='image-frame mr-1'>
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkybW14kISa6-ACbGMlH4yASSX5Qsqmuu5qw&usqp=CAU'
                        className='img-fluid'
                        alt='image'
                    />
                </div>
                <div className='d-flex flex-column justify-content-center ml-1'>
                    <span>{item.name}</span>
                    <small>{item.time}</small>
                </div>
            </MDBRow>
        </MDBCard>
    )
};

const LeftLayout = React.memo(({listChat, isChooseChat, setIsChooseChat}) => {
    return (
        <MDBCol
            className='left-layout'
            size={3}
        >
            <MDBFormInline className="md-form">
                <MDBIcon icon="search"/>
                <input
                    className="form-control form-control-sm ml-3 w-75"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                />
            </MDBFormInline>
            {listChat.map((item, index) =>
                <ChatItem
                    key={index}
                    index={index}
                    item={item}
                    isChooseChat={isChooseChat}
                    setIsChooseChat={setIsChooseChat}
                />
            )}

        </MDBCol>
    )
});

export default LeftLayout;
