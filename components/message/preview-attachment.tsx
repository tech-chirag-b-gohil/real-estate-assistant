

import { FileUIPart } from "ai";

type PreviewAttachmentProps = {
  attachment: FileUIPart;
};

export const PreviewAttachment = (props: PreviewAttachmentProps) => {
  const { attachment } = props;
  const { filename: name, url, mediaType: contentType } = attachment;

  return (
    <div className="w-20 bg-muted rounded-md relative my-1 border-2">
      {
        contentType?.startsWith?.("image") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={url}
            src={url}
            alt={name ?? "An image attachment"}
            className="rounded-md size-full object-cover"
          />
        ) : (
          <div className="" />
        )
      }
    </div>
  );
};
