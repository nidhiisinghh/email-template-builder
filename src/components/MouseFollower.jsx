import React, { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const SPRING_CONFIG = {
    mass: 0.1,
    damping: 10,
    stiffness: 131,
};

const MouseFollower = () => {
    const xSpring = useSpring(0, SPRING_CONFIG);
    const ySpring = useSpring(0, SPRING_CONFIG);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Subtract half the size (10px) to center the 20px cursor
            xSpring.set(e.clientX - 10);
            ySpring.set(e.clientY - 10);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [xSpring, ySpring]);

    return (
        <motion.div
            style={{
                x: xSpring,
                y: ySpring,
                position: "fixed",
                top: 0,
                left: 0,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#2563eb", // Blue color
                pointerEvents: "none", // Ensure clicks pass through
                zIndex: 9999,
            }}
        />
    );
};

export default MouseFollower;
