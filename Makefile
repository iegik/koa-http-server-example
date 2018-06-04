DIR_STATIC = app_static
DIR_TDP = tdp.ru/v02
DIR_CART = cart-module

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

run_httpd:
	@docker run --rm -it \
	--env-file=.env \
	--name koa-rest-api-boilerplate \
	-p $(PORT):7071 \
	posquit0/koa-rest-api-boilerplate

run_db:
	@docker run --rm -it \
	--env-file=.env \
	--name mysql-books \
	-p $(MYSQL_PORT):3306 \
	-v $(PWD)/.mysql/conf.d:/etc/mysql/conf.d \
	-v $(PWD)/.mysql/initdb.d:/docker-entrypoint-initdb.d \
	-v $(PWD)/.mysql/data:/var/lib/mysql \
	-w /var/lib/mysql \
	--link koa-rest-api-boilerplate \
	mysql:5.7.22
