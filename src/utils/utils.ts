import { getAssetPath } from '@stencil/core';

/**
 * Formats a name from first, middle, and last parts
 */
export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

/**
 * Returns the default background image name based on theme
 */
export function getDefaultBackgroundImage(theme: string): string {
  switch (theme) {
    case 'kadetten-unihockey':
      return 'kadetten-unihockey';
    case 'kanva-light':
      return 'kanva-light';
    case 'kanva-dark':
      return 'kanva-dark';
    case 'kanva':
    case 'myclub':
    default:
      return 'kanva';
  }
}

/**
 * Formats a date string from DD.MM.YYYY to localized format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(
    parseInt(dateString.substr(6, 4), 10),
    parseInt(dateString.substr(3, 2), 10) - 1,
    parseInt(dateString.substr(0, 2), 10)
  ).toLocaleDateString('ch-DE', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  });
  
  return date;
}

/**
 * Extracts the numeric game ID from a prefixed string (e.g., "su-1076712" -> "1076712")
 */
export function extractGameId(gameId: string): string {
  if (!gameId) return '';
  const match = gameId.match(/\d+/);
  return match ? match[0] : gameId;
}

/**
 * Builds a GraphQL query for a single game
 */
export function buildGraphQLQuery(gameId: string): string {
  const query = `{
  game(gameId: "${gameId}") {
    date
    time
    location
    city
    teamHome
    teamAway
    teamHomeLogo
    teamAwayLogo
    result
    resultDetail
  }
}`;
  return encodeURIComponent(query);
}

/**
 * Builds a GraphQL query for Swiss Volley team games
 */
export function buildSwissVolleyTeamGamesQuery(teamId: string): string {
  const query = `{
  games(teamId: "${teamId}") {
    id
    date
    time
    location
    city
    teamHome
    teamAway
    teamHomeLogo
    teamAwayLogo
    result
    resultDetail
  }
}`;
  return encodeURIComponent(query);
}

/**
 * Builds a GraphQL query for Swiss Handball team and club games
 */
export function buildSwissHandballTeamClubGamesQuery(teamId: string, clubId: string): string {
  const query = `{
  games(teamId: "${teamId}", clubId: "${clubId}") {
    id
    date
    time
    location
    city
    teamHome
    teamAway
    teamHomeLogo
    teamAwayLogo
    result
    resultDetail
  }
}`;
  return encodeURIComponent(query);
}

/**
 * Parses a date and time string into a Date object
 */
export function parseDateTime(dateStr: string, timeStr: string): Date {
  if (!dateStr) return new Date(0);
  
  const day = parseInt(dateStr.substr(0, 2), 10);
  const month = parseInt(dateStr.substr(3, 2), 10) - 1;
  const year = parseInt(dateStr.substr(6, 4), 10);
  const [hoursStr, minutesStr] = (timeStr || '00:00').split(/[:.]/);
  const hours = parseInt(hoursStr || '0', 10);
  const minutes = parseInt(minutesStr || '0', 10);
  
  return new Date(year, month, day, hours, minutes);
}

/**
 * Returns the background image source URL
 * Either from a custom URL or from theme-based assets
 */
export function getBackgroundImageSrc(backgroundimage: string | undefined, theme: string): string {
  if (backgroundimage && (backgroundimage.startsWith('http') || backgroundimage.startsWith('data:image/'))) {
    return backgroundimage;
  }
  return getAssetPath(`./assets/background-${getDefaultBackgroundImage(theme)}.png`);
}

/**
 * Dynamically loads Google Fonts for the component
 * This ensures fonts are available without requiring HTML modifications
 */
export function loadGoogleFonts(): void {
  // Check if fonts are already loaded
  if (document.querySelector('link[href*="fonts.googleapis.com"]')) {
    return;
  }

  // Create preconnect links for better performance
  const preconnectGoogle = document.createElement('link');
  preconnectGoogle.rel = 'preconnect';
  preconnectGoogle.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnectGoogle);

  const preconnectGstatic = document.createElement('link');
  preconnectGstatic.rel = 'preconnect';
  preconnectGstatic.href = 'https://fonts.gstatic.com';
  preconnectGstatic.crossOrigin = 'anonymous';
  document.head.appendChild(preconnectGstatic);

  // Load Bebas Neue font
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
}