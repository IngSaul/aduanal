# Build: client + SSR + prerender (fetches the blog from Sanity at build time).
# og:images is not part of the build, so no Chrome/ImageMagick here.
FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET=production
ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID
ENV VITE_SANITY_DATASET=$VITE_SANITY_DATASET
COPY package*.json ./
RUN npm ci
COPY . .
# og-preview.html is local-only and .htaccess is for Apache: neither ships.
RUN npm run build && rm -f dist/og-preview.html dist/.htaccess

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
