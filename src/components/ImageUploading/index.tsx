import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import RemovedImage from "../RemovedImage";

const removeBackground = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image_file", imageFile);

    try {
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": "BhCjAzh1gWZHkKZS3HbTngpG",
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to remove background");
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Error removing background:", error);
        return null;
    }
};

export default function UploadSection() {
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [removing, setRemoving] = useState(false);

    const [progress, setProgress] = useState(0);
    const [removedBgImage, setRemovedBgImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setImage(event.target.files[0]);
            setLoading(true);
            const timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(timer);
                        setLoading(false);
                        return 100;
                    }
                    return prevProgress + 5;
                });
            }, 200);
        }
    };

    const handleRemoveBackground = async () => {
        setRemoving(true);
        if (image) {
            setLoading(true);
            const removedBgUrl = await removeBackground(image);
            setLoading(false);
            if (removedBgUrl) {
                setRemovedBgImage(removedBgUrl);
            }
        }
    };

    const handleDownload = () => {
        if (removedBgImage) {
            const link = document.createElement("a");
            link.href = removedBgImage;
            link.download = "removed_background.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center flex-col gap-4"
        >
            <AnimatePresence mode="wait">
                {loading && !removing ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-4 rounded-md"
                    >
                        <Skeleton className="w-[350px] h-[300px]" />
                        <Progress className="w-[350px]" value={progress} />
                    </motion.div>
                ) : image ? (
                    <motion.div
                        key="image"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <div className="border-4 border-black rounded-xl">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded Image"
                                className="aspect-[4/3] rounded-md object-cover w-[350px] h-[300px]"
                            />
                        </div>
                        {image && removing ? (
                            <RemovedImage isProcessing={loading} src={removedBgImage ?? URL.createObjectURL(image)} />
                        ) : null}
                    </motion.div>
                ) : (
                    <motion.img
                        key="logo"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        src="/logo-black.svg"
                        alt="Uploaded Image"
                        className="aspect-[4/3] rounded-md object-cover w-[350px] h-[300px]"
                    />
                )}
            </AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-4"
            >
                {image ? (
                    <div className="flex items-center justify-between gap-4">
                        <button
                            className={`inline-flex ${loading ? "bg-gray-500" : "bg-white border-2 border-black !text-black"
                                } h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-primary-foreground shadow
                                 transition-colors hover:bg-black/90 hover:!text-white disabled:pointer-events-none disabled:opacity-50`}
                            onClick={() => {
                                setImage(null);
                                setRemovedBgImage(null);
                            }}
                            disabled={loading}
                        >
                            Delete
                        </button>
                        {!removedBgImage ? (
                            <button
                                className={`inline-flex ${loading ? "bg-gray-500" : "bg-black"
                                    } h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
                                onClick={handleRemoveBackground}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Remove background"}
                            </button>
                        ) : null}
                        {removedBgImage && (
                            <button
                                className="inline-flex bg-green-500 h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-white shadow transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                onClick={handleDownload}
                            >
                                Download PNG
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="image-upload"
                            className={`inline-flex ${loading ? "bg-gray-500" : "bg-black"
                                } h-10 items-center justify-center rounded-md px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
                        >
                            {loading ? "Uploading..." : "Upload Image"}
                        </label>
                        <input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
