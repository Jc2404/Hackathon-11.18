"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, ArrowUpRight } from "react-feather";

const MadeWithCodeWords = () => {
  return (
    <a href="https://codewords.ai" target="_blank" rel="noopener noreferrer">
      <div className="pl-3 pr-2 flex items-center py-1 rounded-full border-black border opacity-20 hover:opacity-100 transition-opacity">
        Made With CodeWords*
        <ArrowUpRight className="inline" size={16} />
      </div>
    </a>
  );
};

export default function Home() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookImage, setBookImage] = useState(""); // Updated state for image base64 data
  const [creationResponse, setCreationResponse] = useState("");
  const [loading, setLoading] = useState("idle");
  const router = useRouter();

  const handleWriteBook = () => {
    setLoading("loading");
    fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: "clp45g8wb000nl108r4itrnap",
        inputs: {
          animal_image: bookImage, // Send the base64 encoded image data
          title: bookTitle, // Include the book title
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.execution_id);
        setCreationResponse(data);
        if (data.data.execution_id) {
          router.push(`/monster/${data.data.execution_id}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setBookImage(reader.result.split(",")[1]); // Extract base64 data
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex min-h-screen container mx-auto flex-col items-center justify-between gap-8 md:p-24 p-6">
      <h1 className="mt-4 scroll-m-20 text-4xl font-medium tracking-tighter lg:text-5xl text-center ">
        Random Image Generator
      </h1>
      <div className="lg:w-1/2 flex flex-1 flex-col justify-center gap-1 items-stretch ">
        <div className="flex flex-1 flex-col items-center gap-4 justify-center">
          <label className="opacity-50 text-xl">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-center text-xl lg:p-12 lg:text-3xl p-6 placeholder:opacity-30 self-stretch"
          />
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 justify-center">
          <label className="opacity-50 text-xl">Title:</label>
          <Input
            placeholder="A handsome guy."
            className="text-center text-xl lg:p-12 lg:text-3xl p-6 placeholder:opacity-30 self-stretch"
            value={bookTitle}
            autoFocus
            onChange={(e) => {
              setBookTitle(e.target.value);
            }}
          />
        </div>
        <Button
          className={`mb-4 rounded-full mt-2 flex gap-2 items-center transition-all self-center text-xl py-6 px-8 ${
            (loading === "loading" || !bookImage || bookTitle.length < 8) &&
            "opacity-30"
          }`}
          onClick={() =>
            loading !== "loading" &&
            bookImage &&
            bookTitle.length >= 8 &&
            handleWriteBook()
          }
        >
          {loading === "loading" ? (
            <>
              <Loader className="animate-spin" /> Loading
            </>
          ) : (
            <>Generate!</>
          )}
        </Button>
      </div>
      <MadeWithCodeWords />
    </main>
  );
}