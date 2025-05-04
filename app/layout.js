export const metadata = {
  title: 'muuri-next-resize',
  description: 'Muuri-based resizable grid layout',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
