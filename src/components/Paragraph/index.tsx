import { motion } from "framer-motion";

type ParagraphProps = {
    text: string;
    className?: string;
};

const Paragraph: React.FC<ParagraphProps> = ({ text, className }) => {
    return (
        <motion.p
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
        >
            {text}
        </motion.p>
    );
};

export default Paragraph;
