up-local:
	docker compose -f docker-compose.local.yml up -d

up-local-rebuild:
	docker compose -f docker-compose.local.yml up --build --force-recreate

up-local-log-all:
	docker compose -f docker-compose.local.yml up

down-local:
	docker compose -f docker-compose.local.yml down
