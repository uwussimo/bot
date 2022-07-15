FROM denoland/deno:latest
EXPOSE 8080
ENV MODE=NOFS
ENV HOST=POLLING
WORKDIR /app
USER deno
COPY deps.ts .
RUN deno cache deps.ts
COPY . .
RUN deno cache mod.ts
RUN mkdir -p /var/tmp/log
CMD ["run", "--allow-all", "mod.ts"]
