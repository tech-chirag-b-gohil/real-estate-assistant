from openai import BaseModel

class OpenAIMessageChatContent(BaseModel):
  text: str
  text: str | None = None
  image_url: str | None = None

class OpenAIMessage(BaseModel):
  role: str
  content: list[OpenAIMessageChatContent] | None = None

class OpenAIMessages(BaseModel):
  messages: list[OpenAIMessage] = []

class OpenAIMessagePart(BaseModel):
  type: str
  text: str | None = None
  url: str | None = None
  mediaType: str | None = None
  filename: str | None = None

class OpenAIClientMessage(BaseModel):
  id: str
  role: str
  parts: list[OpenAIMessagePart]

class OpenAIChatRequest(BaseModel):
  id: str
  messages: list[OpenAIClientMessage]
  trigger: str = "data"
  agent: str | None = None
