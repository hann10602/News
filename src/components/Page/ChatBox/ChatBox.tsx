"use client";
import { failedNotify } from "@/utils/utils";
import { Close, Send, Sms } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AiBot from "@/assets/img/AI-bot-1.jpg";
import Image from "next/image";

type ChatItem = {
  id: string;
  role: "USER" | "SYSTEM";
  content: string;
};

type Props = {};

const ChatBox = (props: Props) => {
  const [chatContent, setChatContent] = useState<string>("");
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);
  const [chatList, setChatList] = useState<ChatItem[]>([]);

  const chatInputRef = useRef<HTMLInputElement>(null);

  const handleChatSubmit = async () => {
    setChatList((prev) => [
      ...prev,
      { role: "USER", content: chatContent, id: uuidv4() },
    ]);
    setChatContent("");

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer`,
    };
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: chatContent.trim() }],
      temperature: 0.7,
    };

    await axios
      .post(url, data, { headers: headers })
      .then((res) => {
        setChatList((prev) => [
          ...prev,
          {
            role: "SYSTEM",
            content: res.data.choices[0].message.content,
            id: uuidv4(),
          },
        ]);
      })
      .catch(() =>
        setChatList((prev) => [
          ...prev,
          {
            role: "SYSTEM",
            content: "Send message failed",
            id: uuidv4(),
          },
        ])
      );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && chatContent.trim() !== "") {
      handleChatSubmit();
    }
  };

  return (
    <>
      {isChatBoxOpen && (
        <Paper className="fixed w-[360px] h-[500px] bottom-28 right-5 bg-white rounded-sm z-10 flex flex-col">
          <div className="flex justify-between items-center p-2 border-b border-solid border-gray-300">
            <Typography className="font-semibold flex-1">Supporter</Typography>
            <div
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer"
              onClick={() => setIsChatBoxOpen(false)}
            >
              <Close className="text-gray-500 text-md" />
            </div>
          </div>
          <div className="flex-1 px-2 overflow-auto">
            {chatList.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.role === "USER" ? "justify-end" : "justify-start"
                } mb-5`}
              >
                {item.role === "SYSTEM" && (
                  <Image
                    className="w-10 h-10 rounded-full"
                    src={AiBot}
                    alt="ai bot"
                    width={24}
                    height={24}
                  />
                )}
                <Typography
                  className={` ${
                    item.role === "USER" && "bg-blue-500 text-white"
                  } max-w-[70%] border border-solid border-gray-400 rounded-md p-2`}
                >
                  {item.content}
                </Typography>
              </div>
            ))}
          </div>
          <div className="flex p-3 border-t border-solid border-gray-300 items-center">
            <input
              ref={chatInputRef}
              type="text"
              onKeyDown={handleKeyDown}
              value={chatContent}
              onChange={(e) => setChatContent(e.target.value)}
              className="flex-1 h-10 rounded-full outline-none px-3 border border-solid border-gray-300 mr-4"
              placeholder="Ask me anything..."
            />
            <Send
              className="cursor-pointer text-gray-500 hover:text-gray-400"
              onClick={() => chatContent.trim() !== "" && handleChatSubmit()}
            />
          </div>
        </Paper>
      )}
      <div
        className="fixed bottom-14 right-5 rounded-full bg-gray-400 p-3 cursor-pointer"
        onClick={() => setIsChatBoxOpen(!isChatBoxOpen)}
      >
        <Sms className="text-white" />
      </div>
    </>
  );
};

export default ChatBox;
