/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
 */
export interface TwitterMeta {
  card?: TwitterCardType;
  /**
   * @username
   */
  creator?: string | { id: string };
  /**
   * Description of content (maximum 200 characters)
   */
  description?: string;

  site?: string | { id: string };
  /**
   * Title of content (max 70 characters).
   */
  title?: string;
  /**
   * Images must be less than 5MB in size.
   * Support JPG,PNG, WEBP and GIF formats (SVG is not supported)
   */
  image?: TwitterImageMeta;
  /**
   * The video player to use in the card. Used with the `player` card.
   */
  player?: TwitterPlayerMeta;
  /**
   * Meta used with the `app` card.
   */
  app?: TwitterAppMeta;
}

type TwitterCardType = 'app' | 'player' | 'summary' | 'summary_large_image';

interface TwitterImageMeta {
  /**
   * This must be an absolute URL.
   */
  url: string;
  /**
   * Maximum 420 characters.
   */
  alt: string;
}

interface TwitterPlayerMeta {
  /**
   * This must be an absolute URL.
   */
  url: string;
  /**
   * The URL to raw video or audio stream. This must be an absolute URL.
   */
  stream?: string;
  /**
   * Height of the player iframe in pixels.
   */
  height?: number;
  /**
   * Width of the player iframe in pixels.
   */
  width?: number;
}

interface TwitterAppMeta {
  name: string | { iPhone?: string; iPad?: string; googlePlay?: string };
  id: { iPhone?: string; iPad?: string; googlePlay?: string };
  url: { iPhone?: string; iPad?: string; googlePlay?: string };
}
