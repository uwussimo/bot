#!/usr/bin/env just --justfile

alias s := start
alias d := development
alias l := lint
alias f := format

start:
	deno run --allow-all ./mod.ts --config deno.json

development:
	deno run --allow-all --watch ./mod.ts --config deno.json

lint:
	deno lint --config deno.json

format:
	deno fmt --config deno.json

build:
	docker build -t uwubot .
