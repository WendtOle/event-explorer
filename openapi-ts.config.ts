import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://api.demonstrations.org/v1/openapi.json',
  output: 'src/client',
  plugins: [
    '@tanstack/react-query', 
  ],
});