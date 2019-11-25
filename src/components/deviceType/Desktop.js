import React from 'react';
import Sections from "../Sections";
import Elements from "../Elements";
import Content from "../Content";

class Desktop extends React.Component {
    render() {
        return (
            <div className="web-development">
                <Sections/>
                <Elements/>
                <Content/>
            </div>
        );
    }
}


export default Desktop;