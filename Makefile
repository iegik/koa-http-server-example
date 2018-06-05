PORT = 3000
IP = 0.0.0.0
DB_PORT = 3306

# Help
# https://gist.github.com/prwhite/8168133
help: ## Show this help.
	@echo "\
	\n\
	Usage: make [options] [target] ...\n\
	Targets:"; \
	fgrep -h '##' Makefile | awk -F'##|:' '{printf "%40s %s\n", $$1, $$3}' | fgrep -v 'fgrep'

##: Tdp
build:
	@docker build --force-rm -t posquit0/koa-rest-api-boilerplate .

run_net:
	@docker network create \
	koa-rest-api-network

run_httpd:
	@docker run --rm -it \
	--env-file=$(PWD)/.env \
	--name koa-rest-api-boilerplate \
	-p $(PORT):7071 \
	--network koa-rest-api-network \
	posquit0/koa-rest-api-boilerplate

run\:%:
	@docker exec -it \
	koa-rest-api-boilerplate \
	$(subst run:,,$@)

run_db:
	@docker run --rm -it \
	--env-file=$(PWD)/.env \
	--name mysql-books \
	-p $(DB_PORT):3306 \
	-v $(PWD)/.mysql/conf.d:/etc/mysql/conf.d \
	-v $(PWD)/.mysql/initdb.d:/docker-entrypoint-initdb.d \
	-v $(PWD)/.mysql/data:/var/lib/mysql \
	-w /var/lib/mysql \
	--network koa-rest-api-network \
	mysql:5.7.22
