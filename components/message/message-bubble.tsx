"use client";

import { motion } from "framer-motion";

import { SparklesIcon, UserIcon } from "../icons";
import { Markdown } from "../markdown";
import { PreviewAttachment } from "./preview-attachment";
import { cn } from "@/lib/utils";
import { UIMessage } from "@ai-sdk/react";

type MessageBubbleProps = {
  message: UIMessage;
};

export const MessageBubble = (props: MessageBubbleProps) => {
  const { message } = props;
  const files = message.parts?.filter(part => part.type === "file") || [];
  const text = message.parts?.filter(part => part.type === "text") || [];
  return (
    <div className="group/message" data-role={message.role}>
      <motion.div
        className={cn("w-full mx-auto max-w-3xl px-4 flex gap-2 items-start group-data-[role=user]/message:items-start group-data-[role=user]/message:flex-row-reverse")}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {message.role === "assistant" && (
          <div className="size-7 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
            <SparklesIcon size={14} />
          </div>
        )}
        {message.role === "user" && (
          <div className="size-7 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
            <UserIcon size={14} />
          </div>
        )}
        <div
          className={cn(
            `group-data-[role=user]/message:bg-zinc-300 group-data-[role=user]/message:dark:bg-zinc-600
            flex gap-4 
            group-data-[role=user]/message:px-3 
            w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl py-1 rounded-xl`,
          )}
        >
          <div className="flex flex-col gap-1">
            {
              text.length > 0 && (
                <div className="flex flex-col gap-2">
                  {text.map((part, index) => (
                    <div key={index} className="basis-full text-sm">
                      <Markdown>
                        {"text" in part ? part.text : ""}
                      </Markdown>
                    </div>
                  ))}
                </div>
              )
            }
            {
              files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {files.map((part, index) => (
                    <div key={index}>
                      {"mediaType" in part && "url" in part ? (
                        <PreviewAttachment attachment={part} />
                      ) : null}
                    </div>
                  ))}
                </div>
              )
            }
            {
              files.length === 0 && text.length === 0 && (
                <div className="text-muted-foreground">No content available</div>
              )
            }
          </div>
        </div>
      </motion.div>
    </div>
  );
};
