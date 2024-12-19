export const metadata = {
  title: 'Firesight Dynamo UI',
  description: 'Muuri-based resizable grid layout for Firesight',
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
