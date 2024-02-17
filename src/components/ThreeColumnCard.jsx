import React, { useEffect, useState } from 'react';
import './ThreeColumnCard.css';
import { columnData } from "../data";

const ThreeColumnCard = () => {
    const [colors, setColors] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        // Dynamically get the CSS variable values
        const rootStyle = getComputedStyle(document.documentElement);
        setColors([
            rootStyle.getPropertyValue('--bright-orange').trim(),
            rootStyle.getPropertyValue('--dark-cyan').trim(),
            rootStyle.getPropertyValue('--very-dark-cyan').trim()
        ]);
    }, []);

    return (
        <div className="three-column-card">
            {columnData.map((item, index) => {
                const isMobile = width <= 768;
                const style = {
                    backgroundColor: colors[index % colors.length],
                    borderTopLeftRadius: index === 0 ? "10px" : "0",
                    borderTopRightRadius: isMobile ? index === 0 ? "10px" : "0" : index === columnData.length - 1 ? "10px" : "0",
                    borderBottomLeftRadius: isMobile ? index === columnData.length - 1 ? "10px" : "0" : index === 0 ? "10px" : "0",
                    borderBottomRightRadius: index === columnData.length - 1 ? "10px" : "0"
                }

                const buttonStyle = {
                    backgroundColor: "white",
                    color: colors[index % colors.length],
                    border: `2px solid ${colors[index % colors.length]}`
                }

                return (
                    <div key={index} className="column" style={style}>
                        <img src={item.icon} alt="icon" />
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                        <button style={buttonStyle}>
                            Learn More
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ThreeColumnCard;
