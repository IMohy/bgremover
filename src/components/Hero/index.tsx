import { useState, useEffect } from "react";
import Paragraph from "../Paragraph";

interface AccountInfo {
    data: {
        attributes: {
            api: {
                free_calls: number;
            };
        };
    };
}

const Hero = () => {
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const response = await fetch("https://api.remove.bg/v1.0/account", {
                    method: "GET",
                    headers: {
                        "X-Api-Key": "BhCjAzh1gWZHkKZS3HbTngpG",
                    },
                });
                const data = await response.json();
                setAccountInfo(data);
            } catch (error) {
                console.error("Error fetching account info:", error);
            }
        };

        fetchAccountInfo();
    }, []);
    console.log(accountInfo);
    return (
        <div className="text-black flex-col flex items-center justify-center my-8">
            <Paragraph text="Remove Backgrounds Easily" className="text-3xl font-bold mb-4" />

            <Paragraph text="Remove backgrounds from images quickly and easily with our online tool. Perfect for professionals and casual users alike." />

            <Paragraph text="Start enhancing your images today!" className="mt-4 text-lg font-semibold" />

            {accountInfo && (
                <div className="mt-6 p-4 flex items-center gap-4 text-white rounded-lg">
                    <h3 className="text-xl font-bold ">Remaining Free Calls:</h3>
                    <p >{JSON.stringify(accountInfo.data.attributes.api.free_calls, null, 2)}</p>
                </div>
            )}
        </div>
    );
};

export default Hero;
