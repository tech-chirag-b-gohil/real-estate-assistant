import os

from openai import OpenAI

from api.types.openai_chat import OpenAIMessages


class OpenAIClient:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),
        )
        self.model = os.environ.get("OPENAI_MODEL")

    def get_client(self):
        return self.client

    def query_openai(self, messages: OpenAIMessages, stream=False):
        response = self.client.chat.completions.create(
            messages=messages,
            model=self.model,
            stream=stream
        )
        return response
    
    def stream_text(self, text_to_stream: str):
        for chunk in text_to_stream:
            for choice in chunk.choices:
                if choice.finish_reason == "stop":
                    continue
                else:
                    yield choice.delta.content

            if chunk.choices == []:
                usage = chunk.usage
                prompt_tokens = usage.prompt_tokens
                completion_tokens = usage.completion_tokens

                yield 'e:{{"finishReason":"{reason}","usage":{{"promptTokens":{prompt},"completionTokens":{completion}}},"isContinued":false}}\n'.format(
                    reason="stop",
                    prompt=prompt_tokens,
                    completion=completion_tokens
                )
