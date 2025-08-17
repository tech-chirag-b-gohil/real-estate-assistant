from api.constants.prompts import AGENT_SYSTEM_PROMPTS
from api.types.openai_chat import OpenAIMessage, OpenAIClientMessage, OpenAIMessages

def prepend_system_prompt_message(messages: OpenAIMessages, agent: str) -> OpenAIMessages:
    system_prompt_message: OpenAIMessage = {
        "role": "system",
        "content": [{
          "type": "text", 
          "text": AGENT_SYSTEM_PROMPTS.get(agent, "")
        }]
    }
    return [system_prompt_message] + messages

def convert_to_openai_messages(messages: list[OpenAIClientMessage]) -> OpenAIMessages:
    openai_messages: OpenAIMessages = []

    for message in messages:
        openai_message: OpenAIMessage = {
            "role": message.role,
            "content": []
        }

        for part in message.parts:
            if part.type == "text":
                openai_message["content"].append({
                    "type": "text",
                    "text": part.text
                })
            elif part.type == "file":
                openai_message["content"].append({
                    "type": "image_url",
                    "image_url": {
                        "url": part.url
                    }
                })
            else:
                # Handle other types if necessary
                continue

        openai_messages.append(openai_message)

    return openai_messages