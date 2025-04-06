// theme.js (place this in the root of your project or in a utils folder)
export const colors = {
    light: {
      primary: '#333',
      secondary: '#666',
      background: '#fff',
      text: '#000'
    },
    dark: {
      primary: '#fff',
      secondary: '#ccc',
      background: '#000',
      text: '#fff'
    }
  };
  
  export const createStyles = (theme) => ({
    section: {
      padding: '20px',
      backgroundColor: theme.background,
      color: theme.text
    }
  });

  