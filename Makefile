# Help
# https://gist.github.com/prwhite/8168133
help: ## Show this help.
	@echo "\n\
	Usage: make [options] [target] ...\n\
	Targets:"; \
		fgrep -h '##' Makefile | awk -F'##|:' '{printf "%40s %s\n", $$1, $$3}' | fgrep -v 'fgrep'

build: ## Build
	@docker-compose up

jest: ## Run unit tests
	@docker-compose exec \
		httpd \
		npm run test

# Debugging

httpd\:%:
	@docker-compose exec \
		httpd \
		$(subst httpd:,,$@)

db\:%:
	@docker exec \
    	db \
    	$(subst db:,,$@)

.PONY: help build test
