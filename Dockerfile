# Usa imagen base de nginx
FROM nginx:alpine

# Copia archivos al directorio estático de nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
