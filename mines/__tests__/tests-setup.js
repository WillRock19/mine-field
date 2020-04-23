require('react-native-mock-render/mock');

const originalConsoleError = console.error;
console.error = message => {
  if (message.startsWith('Warning:')) {
    return;
  }

  originalConsoleError(message);
};
