# Gunakan Node.js versi yang sesuai dengan proyekmu
FROM node:18-alpine

# Set working directory dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Copy seluruh isi direktori proyek
COPY . .

ENV NODE_ENV production

# Build aplikasi Next.js
RUN npm run build

# Expose port 3000 (port default Next.js)
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]