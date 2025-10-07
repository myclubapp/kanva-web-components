[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# myclub Game Preview & Game Results

Web Components for displaying game previews and results for myclub sports events. Built with StencilJS.

## Components

### `<game-preview>`

Displays an upcoming game with team logos, date, time, location and theme-based styling.

#### Properties

| Property          | Attribute         | Description                                                                          | Type      | Default     |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------ | --------- | ----------- |
| `club`            | `club`            | Club Id from my-club                                                                 | `string`  | `undefined` |
| `game`            | `game`            | Game Id from my-club                                                                 | `string`  | `undefined` |
| `width`           | `width`           | Width of the preview                                                                 | `string`  | `'400'`     |
| `height`          | `height`          | Height of the preview                                                                | `string`  | `'400'`     |
| `theme`           | `theme`           | Theme of the preview (controls colors only)                                          | `string`  | `'myclub'`  |
| `backgroundimage` | `backgroundimage` | Background image name (without extension). Falls back to theme name if not provided. | `string`  | `undefined` |
| `ishomegame`      | `ishomegame`      | Is this a home game?                                                                 | `boolean` | `false`     |

#### Supported Themes

Themes control color schemes only. Background images are managed separately via the `backgroundimage` parameter.

- `myclub` / `myclub-light` - Primary: #339bde, Secondary: #795deb
- `myclub-dark` - Primary: #795deb, Secondary: #339bde (dark background)
- `light` - Primary: #339bde, Secondary: #795deb
- `dark` - Primary: #795deb, Secondary: #339bde (dark background)
- `kadetten-unihockey` - Primary: orange, Secondary: black

### `<game-result>`

Displays the final result of a completed game with score and theme-based styling.

#### Properties

| Property          | Attribute         | Description                                                                          | Type     | Default     |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------ | -------- | ----------- |
| `club`            | `club`            | Club Id from my-club                                                                 | `string` | `undefined` |
| `game`            | `game`            | Game Id from my-club                                                                 | `string` | `undefined` |
| `width`           | `width`           | Width of the preview                                                                 | `string` | `'400'`     |
| `height`          | `height`          | Height of the preview                                                                | `string` | `'400'`     |
| `theme`           | `theme`           | Theme of the preview (controls colors only)                                          | `string` | `'myclub'`  |
| `backgroundimage` | `backgroundimage` | Background image name (without extension). Falls back to theme name if not provided. | `string` | `undefined` |

## Installation

```html
<!doctype html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <title>myclub Game Review und Results</title>
  <script type="module" src="/build/myclub-game-preview.esm.js"></script>
  <script nomodule src="/build/myclub-game-preview.js"></script>
</head>
<body>
  <!-- Your components here -->
</body>
</html>
```

## Usage Examples

### Away Game Preview (default background)
```html
<!-- Uses background-kadetten-unihockey.png automatically -->
<game-preview
  club="su-452800"
  ishomegame="false"
  game="su-1076760"
  width="400"
  height="400"
  theme="kadetten-unihockey">
</game-preview>
```

### Home Game Preview (custom background)
```html
<!-- Uses myclub-dark colors with background-custom.png -->
<game-preview
  club="su-452800"
  ishomegame="true"
  game="su-1076776"
  width="400"
  height="400"
  theme="myclub-dark"
  backgroundimage="custom">
</game-preview>
```

### Game Result
```html
<!-- Uses background-kadetten-unihockey.png automatically -->
<game-result
  club="su-452800"
  game="su-1072055"
  width="400"
  height="400"
  theme="kadetten-unihockey">
</game-result>
```

### Custom Background Image
```html
<!-- Uses background-my-special-background.png with light theme colors -->
<game-preview
  club="su-452800"
  game="su-1076760"
  theme="light"
  backgroundimage="my-special-background">
</game-preview>
```

## Development

```bash
npm install
npm start
```

## Build

```bash
npm run build
```
