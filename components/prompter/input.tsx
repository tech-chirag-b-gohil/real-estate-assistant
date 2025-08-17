"use client";

import type React from "react";
import {
  useRef,
  useState,
  useEffect
} from "react";
import { toast } from "sonner";

import { cn, sanitizeUIMessage } from "@/lib/utils";

import { ArrowUpIcon, StopIcon, UploadIcon, MenuIcon, CrossIcon } from "../icons";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

const suggestedActions = [
  "Analyze the property",
  "How much notice do I need to give before vacating?",
  "Can my landlord increase rent midway through the contract?",
  "What to do if the landlord is not returning the deposit?",
];


export function Input({
  isLoading,
  stop,
  sendMessage,
  className,
}: {
  isLoading: boolean;
  stop: () => void;
  sendMessage: (message: any) => void;
  className?: string;
}) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (textareaRef.current) {
      const imagePlaceholderHeight = files ? 100 : 2;
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + imagePlaceholderHeight}px`;
    }
  }, [files]);

  const removeFile = (index: number) => {
    const newFiles = files ? [...files] : [];
    newFiles.splice(index, 1);
    setFiles(newFiles.length > 0 ? newFiles : undefined);
  };

  const addFile = (files: File[]) => {
    const newFiles = files ? Array.from(files) : [];
    setFiles((prevFiles) => (prevFiles ? [...prevFiles, ...newFiles] : newFiles));
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files || undefined;
    if (files) {
      addFile(Array.from(files));
    }
    textareaRef?.current?.focus();
  }

  const submitForm = async () => {
    const msg: { text: string; files?: FileList } = { text: sanitizeUIMessage(input) };
    if (files) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => {
        dataTransfer.items.add(file);
      });
      msg.files = dataTransfer.files;
    }
    sendMessage(msg);
    setInput("");
    setFiles(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev: boolean) => !prev);
  };

  const handleSuggestedActionClick = (action: string) => {
    setInput(action);
    setMenuOpen(false);
    textareaRef?.current?.focus();
  };

  return (
    <div className="relative w-full flex flex-col gap-4">

      <div className="relative">
        <Button
          variant="ghost"
          className="rounded-full p-1.5 h-fit m-0.5 border dark:border-zinc-600"
          onClick={(event) => {
            event.preventDefault();
            toggleMenu();
          }}
          disabled={isLoading}
        >
          <MenuIcon size={14} />
          Common Questions
        </Button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10 bg-black opacity-10" onClick={toggleMenu}></div>
            <div className="absolute left-0 bottom-0 mt-2 w-48 bg-muted border rounded-md shadow-lg z-10">
              {suggestedActions.map((action) => (
                <div
                  key={action}
                  onClick={() => handleSuggestedActionClick(action)}
                  className="whitespace-normal text-muted-foreground text-xs px-4 py-2 hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-primary cursor-pointer"
                >
                  {action}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className={cn(
          "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl !text-base bg-muted",
          className,
        )}
        rows={3}
        name="chat-input"
        autoFocus
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              submitForm();
            }
          }
        }}
      />

      {files && (
        <div className="absolute bottom-2 left-2 flex items-center gap-2">
          {
            Array.from(files).map((file, index) => (
              <div key={index} className="h-[75px] w-[75px] rounded-md overflow-hidden bg-muted relative" data-index={index}>
                <Image src={URL.createObjectURL(file)} alt="Uploaded Image" fill />
                <div
                  className="absolute top-1 right-1 text-muted-foreground hover:text-primary cursor-pointer bg-black bg-opacity-80 rounded-full p-1"
                  onClick={() => removeFile(index)}
                >
                  <CrossIcon size={12} />
                </div>
              </div>
            ))
          }
        </div>
      )}

      <div className="flex justify-end absolute bottom-2 right-2">
        {isLoading ? (
          <Button
            className="rounded-full p-1.5 h-fit m-0.5 border dark:border-zinc-600"
            onClick={(event) => {
              event.preventDefault();
              stop();
            }}
          >
            <StopIcon size={14} />
          </Button>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              disabled={isLoading} 
              onChange={handleImageUpload}
              multiple
            />
            <label htmlFor="image-upload" className="rounded-full p-1.5 h-fit m-0.5 mx-2 border dark:border-zinc-600">
              <UploadIcon size={14} />
            </label>
            <Button
              className="rounded-full p-1.5 h-fit m-0.5 border dark:border-zinc-600"
              onClick={(event) => {
                event.preventDefault();
                submitForm();
              }}
              disabled={input.length === 0}
            >
              <ArrowUpIcon size={14} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
