.PHONY: help up down restart logs clean build open-frontend open-backend test

# Cores para output
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

# Variáveis
FRONTEND_URL := http://localhost:3000
BACKEND_URL := http://localhost:8000

##@ Geral

help: ## Mostra esta mensagem de ajuda
	@echo ''
	@echo '${YELLOW}Comandos disponíveis:${RESET}'
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  ${GREEN}%-15s${RESET} %s\n", $$1, $$2 } /^##@/ { printf "\n${YELLOW}%s${RESET}\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Execução

up: ## Inicia todos os serviços (database, backend, frontend)
	@echo '${GREEN}Iniciando serviços...${RESET}'
	docker-compose up --build -d
	@echo '${YELLOW}Aguardando serviços ficarem prontos...${RESET}'
	@./wait-for-services.sh || echo 'Serviços podem ainda estar iniciando. Use "make logs" para verificar.'
	@echo '${GREEN}✓ Serviços iniciados!${RESET}'
	@echo '${YELLOW}Frontend:${RESET} ${FRONTEND_URL}'
	@echo '${YELLOW}Backend:${RESET} ${BACKEND_URL}'
	@echo '${GREEN}Abrindo frontend no navegador...${RESET}'
	@sleep 2
	@xdg-open $(FRONTEND_URL) 2>/dev/null || open $(FRONTEND_URL) 2>/dev/null || start $(FRONTEND_URL) 2>/dev/null || echo "Por favor, abra manualmente: $(FRONTEND_URL)"

down: ## Para todos os serviços
	@echo '${GREEN}Parando serviços...${RESET}'
	docker-compose down
	@echo '${GREEN}✓ Serviços parados!${RESET}'

restart: ## Reinicia todos os serviços
	@echo '${GREEN}Reiniciando serviços...${RESET}'
	$(MAKE) down
	$(MAKE) up

logs: ## Mostra os logs de todos os serviços
	docker-compose logs -f

logs-backend: ## Mostra apenas os logs do backend
	docker-compose logs -f backend

logs-frontend: ## Mostra apenas os logs do frontend
	docker-compose logs -f frontend

logs-db: ## Mostra apenas os logs do banco de dados
	docker-compose logs -f db

##@ Build

build: ## Reconstrói todas as imagens
	@echo '${GREEN}Reconstruindo imagens...${RESET}'
	docker-compose build --no-cache

rebuild: ## Remove containers, volumes e reconstroi tudo do zero
	@echo '${GREEN}Reconstruindo tudo do zero...${RESET}'
	docker-compose down -v
	docker-compose build --no-cache
	docker-compose up -d

##@ Limpeza

clean: ## Para os serviços e remove volumes e imagens não utilizadas
	@echo '${GREEN}Limpando projeto...${RESET}'
	docker-compose down -v
	docker system prune -f
	@echo '${GREEN}✓ Limpeza concluída!${RESET}'

##@ Utilidades

open: ## Abre o frontend no navegador padrão
	@echo '${GREEN}Abrindo frontend...${RESET}'
	@xdg-open $(FRONTEND_URL) 2>/dev/null || open $(FRONTEND_URL) 2>/dev/null || start $(FRONTEND_URL) 2>/dev/null || echo "Por favor, abra manualmente: $(FRONTEND_URL)"

open-frontend: open ## Alias para 'open'

open-backend: ## Abre o backend (API docs) no navegador
	@echo '${GREEN}Abrindo backend...${RESET}'
	@xdg-open $(BACKEND_URL)/docs 2>/dev/null || open $(BACKEND_URL)/docs 2>/dev/null || start $(BACKEND_URL)/docs 2>/dev/null || echo "Por favor, abra manualmente: $(BACKEND_URL)/docs"

status: ## Mostra o status dos containers
	@echo '${YELLOW}Status dos containers:${RESET}'
	@docker-compose ps

shell-backend: ## Abre um shell no container do backend
	docker-compose exec backend /bin/bash

shell-frontend: ## Abre um shell no container do frontend
	docker-compose exec frontend /bin/bash

shell-db: ## Abre um shell psql no banco de dados
	docker-compose exec db psql -U postgres -d planilha

##@ Desenvolvimento

test: ## Executa testes (adicione seus testes conforme necessário)
	@echo '${GREEN}Executando testes...${RESET}'
	@echo '${YELLOW}Testes ainda não implementados${RESET}'

dev: ## Modo desenvolvimento (com logs em tempo real)
	@echo '${GREEN}Iniciando em modo desenvolvimento...${RESET}'
	docker-compose up --build

stop: down ## Alias para 'down'
start: up ## Alias para 'up'

