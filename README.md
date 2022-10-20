# drawing-ui
#### Componentes genéricos usados em projetos da consystec

## Rodar o projeto

npm i (Istala todas as dependências necessárias)
npm run dev (Inicia projeto com o webpack)

## Gerando versão

Reverter alterações do arquivo em ./site/App.tsx (Evita conflito desnecessário)

git add .
git commit -m "mensagem do commit aqui"
npm run build (new | evo | bug)

## Comandos package.json

build = Altera versão do package.json

postbuild = chama os comandos: clean, tsc, copy-files, (Chamado automaticamente após o build)

clean = Remove a pasta dist caso ela exista

tsc = compila arquivos para produção (Traduz tsx para js e cria arquivos de declaração)

copy-files: Copia arquivos .css para pasta dist

dev: Roda sistema para DESENVOLVIMENTO