"use client";

import { ThinkingMessage } from "@/components/message/thinking-message";
import { MessageBubble } from "./message/message-bubble"; 
import { Input } from "@/components/prompter/input";
import { Overview } from "@/components/message/overview";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { TextStreamChatTransport} from "ai";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Chat() {
  const { activeAgent } = useSelector((state: RootState) => state.agent);

  const {
    clearError,
    error,
    id: chatId,
    messages,
    setMessages,
    sendMessage,
    status,
    stop
  } = useChat({
    transport: new TextStreamChatTransport({
    }),
    onError: (error) => {
      if (error.message.includes("Too many requests")) {
        toast.error(
          "You are sending too many messages. Please try again later.",
        );
      }
    }
  });

  const isLoading = status === "streaming";

  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  const sendChatMessage = (msg: any) => {
    sendMessage(msg, {
      body: {
        agent: activeAgent?.slug
      }
    });
  };

  console.log(isLoading, messages.length, messages[messages.length - 1]?.role, messages[messages.length - 1]?.role === "user");

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-55px)] bg-background">
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-3 flex-1 overflow-y-auto pt-4"
      >
        {messages.length === 0 && <Overview />}

        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>

      <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <Input
          isLoading={isLoading}
          stop={stop}
          sendMessage={sendChatMessage}
        />
      </form>
    </div>
  );
}
