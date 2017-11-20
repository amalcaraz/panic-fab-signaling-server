.PHONY: build dev shell


build:
	docker-compose -f environment/dev/docker-compose.yml build

dev: build
	docker-compose -f environment/dev/docker-compose.yml run --rm -e SETTINGS=settings/dev.yaml --service-ports web /bin/bash -c "npm run serve-dev"

shell: build
	docker-compose -f environment/dev/docker-compose.yml run --rm -e SETTINGS=settings/dev.yaml --service-ports web /bin/bash
