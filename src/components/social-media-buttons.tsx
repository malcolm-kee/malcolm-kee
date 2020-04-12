import * as React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailIcon,
  EmailShareButton,
  TelegramIcon,
  TelegramShareButton,
} from 'react-share';

export type SocialMediaButtonsProps = {
  details: NavigatorShareOption;
  onDone: () => void;
};

export default function SocialMediaButtons({
  details,
  onDone,
}: SocialMediaButtonsProps) {
  return (
    <>
      <FacebookShareButton
        url={details.url}
        quote={details.title}
        onShareWindowClose={onDone}
      >
        <FacebookIcon size={48} round aria-hidden />
        <span className="sr-only">Share on Facebook</span>
      </FacebookShareButton>
      <LinkedinShareButton
        url={details.url}
        title={details.title}
        summary={details.text}
        onShareWindowClose={onDone}
      >
        <LinkedinIcon size={48} round aria-hidden />
        <span className="sr-only">Share on LinkedIn</span>
      </LinkedinShareButton>
      <WhatsappShareButton
        url={details.url}
        title={details.title}
        onShareWindowClose={onDone}
      >
        <WhatsappIcon size={48} round aria-hidden />
        <span className="sr-only">Share via Whatsapp</span>
      </WhatsappShareButton>
      <TelegramShareButton
        url={details.url}
        title={details.title}
        onShareWindowClose={onDone}
      >
        <TelegramIcon size={48} round aria-hidden />
        <span className="sr-only">Share via Telegram</span>
      </TelegramShareButton>
      <EmailShareButton
        url={details.url}
        subject={details.title}
        body={details.text}
        onShareWindowClose={onDone}
      >
        <EmailIcon size={48} round aria-hidden />
        <span className="sr-only">Share via Email</span>
      </EmailShareButton>
    </>
  );
}
