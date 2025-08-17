from fastapi.responses import StreamingResponse
from api.core.openai_client import OpenAIClient
from api.types.openai_chat import OpenAIChatRequest
from api.utilities.openai_message_helper import convert_to_openai_messages, prepend_system_prompt_message


async def handle_chat(request: OpenAIChatRequest) -> StreamingResponse:
    messages = request.messages
    agent = request.agent

    openai_messages = convert_to_openai_messages(messages)

    openai_messages_with_system_prompt = prepend_system_prompt_message(
      openai_messages, agent
    )

    openai_client = OpenAIClient()

    response = openai_client.query_openai(
      messages=openai_messages_with_system_prompt,
      stream=True
    )

    streaming_response = StreamingResponse(
        openai_client.stream_text(response)
    )
    return streaming_response
