#!/bin/bash

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Verificando se os serviços estão prontos...${NC}"

# Função para verificar se uma porta está aberta
check_port() {
    local host=$1
    local port=$2
    timeout 1 bash -c "echo > /dev/tcp/$host/$port" 2>/dev/null
}

# Aguardar PostgreSQL (30s máximo)
echo -n "Aguardando PostgreSQL na porta 5432..."
ATTEMPT=0
while ! check_port localhost 5432; do
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -ge 30 ]; then
        echo -e "\n${RED}✗ Timeout aguardando PostgreSQL${NC}"
        exit 1
    fi
    sleep 1
    echo -n "."
done
echo -e " ${GREEN}✓${NC}"

# Aguardar Backend (60s máximo)
echo -n "Aguardando Backend na porta 8000..."
ATTEMPT=0
while ! check_port localhost 8000; do
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -ge 60 ]; then
        echo -e "\n${YELLOW}⚠ Backend pode ainda estar iniciando${NC}"
        exit 0  # Não falha, apenas continua
    fi
    sleep 1
    echo -n "."
done
echo -e " ${GREEN}✓${NC}"

# Aguardar Frontend (90s máximo para build do React)
echo -n "Aguardando Frontend na porta 3000..."
ATTEMPT=0
while ! check_port localhost 3000; do
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -ge 90 ]; then
        echo -e "\n${YELLOW}⚠ Frontend pode ainda estar iniciando${NC}"
        exit 0  # Não falha, apenas continua
    fi
    sleep 1
    echo -n "."
done
echo -e " ${GREEN}✓${NC}"

echo -e "\n${GREEN}✓ Todos os serviços estão prontos!${NC}"
exit 0

