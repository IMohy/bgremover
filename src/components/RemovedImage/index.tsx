import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RemovedImageProps {
    src: string;
    isProcessing: boolean;
}

const RemovedImage: React.FC<RemovedImageProps> = ({ src, isProcessing }) => {
    return (
        <div className="relative w-[350px] h-[310px] border-4 border-black rounded-xl">
            <motion.img
                className="aspect-[4/3] rounded-md object-cover w-full h-full"
                src={src}
                alt="Removed Image"
                initial={{ filter: "blur(0px)" }}
                animate={{ filter: isProcessing ? "blur(4px)" : "blur(0px)" }}
                transition={{ duration: 0.3 }}
            />
            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        className="absolute inset-0 overflow-hidden rounded-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-black/40 opacity-30"
                            initial={{ y: "100%" }}
                            animate={{ y: "-100%" }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RemovedImage;
