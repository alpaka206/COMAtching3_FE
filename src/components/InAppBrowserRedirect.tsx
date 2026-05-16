import { useEffect } from "react";

const REDIRECT_MARKER = "openExternalBrowser";
const IN_APP_BROWSER_PATTERN =
  /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsapp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|daumapps|daumdevice\/mobile|fb_iab|fb4a|fban|fbios|fbss|samsungbrowser\/[^1]/i;

function getMarkedUrl(currentUrl: URL) {
  const nextUrl = new URL(currentUrl);
  nextUrl.searchParams.set(REDIRECT_MARKER, "1");
  return nextUrl.toString();
}

function getAndroidChromeIntent(currentUrl: URL) {
  if (currentUrl.protocol !== "http:" && currentUrl.protocol !== "https:") {
    return null;
  }

  const scheme = currentUrl.protocol.replace(":", "");
  const urlWithoutScheme = currentUrl.toString().replace(/^https?:\/\//i, "");

  return `intent://${urlWithoutScheme}#Intent;scheme=${scheme};package=com.android.chrome;end`;
}

async function copyUrlToClipboard(url: string) {
  if (!navigator.clipboard?.writeText) return;

  try {
    await navigator.clipboard.writeText(url);
  } catch {
    // 클립보드 권한이 없으면 외부 브라우저 전환만 진행
  }
}

function InAppBrowserRedirect() {
  useEffect(() => {
    const currentUrl = new URL(window.location.href);

    if (currentUrl.searchParams.get(REDIRECT_MARKER) === "1") {
      return;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const markedUrl = getMarkedUrl(currentUrl);

    if (userAgent.includes("kakaotalk")) {
      window.location.replace(
        `kakaotalk://web/openExternal?url=${encodeURIComponent(markedUrl)}`,
      );
      return;
    }

    if (userAgent.includes("line")) {
      window.location.replace(markedUrl);
      return;
    }

    if (!IN_APP_BROWSER_PATTERN.test(userAgent)) {
      return;
    }

    if (/iphone|ipad|ipod/.test(userAgent)) {
      void copyUrlToClipboard(markedUrl);
      alert(
        'URL 주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤 "붙여넣기 및 이동"을 선택해 주세요.',
      );
      window.location.replace("x-web-search://?");
      return;
    }

    const intentUrl = getAndroidChromeIntent(currentUrl);

    if (intentUrl) {
      window.location.replace(intentUrl);
    }
  }, []);

  return null;
}

export default InAppBrowserRedirect;
