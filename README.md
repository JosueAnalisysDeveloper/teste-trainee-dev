RELATÓRIO TÉCNICO - [JOSUÉ MATOS]

# 1. Visão Geral do Projeto

Este projeto consistiu na recuperação e aprimoramento de uma aplicação web de gerenciamento de tarefas desenvolvida em Angular. O trabalho iniciou com a identificação e correção de problemas estruturais que impediam o funcionamento adequado da aplicação. Foram necessários ajustes em configurações do Angular, correção de importações e instalação de dependências essenciais para estabilizar o ambiente de desenvolvimento.

Na fase de correção de bugs, foram abordados diversos problemas que afetavam a experiência do usuário. Entre eles, destacam-se falhas no sistema de adição de tarefas, problemas nos botões de ação (editar, excluir e limpar), comportamentos incorretos nas funcionalidades de exibição e a falta de validações nos formulários. Estas correções também incluíram melhorias visuais para tornar a interface mais coerente e acessível.

O processo de modernização da aplicação incluiu a implementação de novas funcionalidades significativas. Foi adicionado um sistema de ordenação alfabética para melhor organização das tarefas, implementado um atalho via tecla Enter para facilitar a adição de tarefas, desenvolvido um sistema para adicionar múltiplas tarefas simultaneamente, criada uma funcionalidade de exportação da lista para PDF, implementado um filtro de palavras impróprias em português e substituídos os alertas nativos do navegador por uma experiência mais elegante utilizando a biblioteca SweetAlert2.

Durante todo o desenvolvimento, foram mantidas boas práticas de versionamento com Git, com registro contínuo das alterações no README do projeto. Esta abordagem permitiu um controle claro das modificações realizadas e facilitará futuras manutenções.

O resultado final é uma aplicação mais robusta, intuitiva e funcional, que atende efetivamente às necessidades de gerenciamento pessoal de tarefas. A aplicação agora oferece uma experiência de usuário mais moderna e agradável, com funcionalidades que realmente agregam valor ao processo de gerenciamento de tarefas.


# 2. Como Executar a Aplicação:
Para rodar este projeto localmente em sua máquina, siga os passos abaixo:

Primeiro, faça o clone do repositório com o seguinte comando:

    git clone ([https://github.com/JosueAnalisysDeveloper/teste-trainee-dev.git])
Em seguida, entre na pasta do projeto:

    cd teste-trainee-dev
Agora, instale todas as dependências necessárias:

    npm install
Com tudo pronto, inicie o servidor de desenvolvimento com:

    ng serve
Após isso, a aplicação estará acessível no seu navegador, através do endereço:

http://localhost:4200/
    
## 3. Correção dos Erros Iniciais (npm start):

Ao iniciar o desenvolvimento desta aplicação, nos deparamos com problemas significativos que impediam seu funcionamento. O primeiro desafio foi a configuração do ambiente Angular, onde o arquivo angular.json apresentava configurações incompatíveis, especialmente com dependências CommonJS, causando falhas na compilação.

Encontramos também problemas com o Angular Material, onde componentes essenciais não carregavam corretamente devido a importações ausentes. Na parte de tipagem TypeScript, havia diversos erros que afetavam diretamente as operações básicas de gerenciamento de tarefas.

A interface do usuário apresentava problemas críticos: a barra de rolagem não funcionava, os botões de ação não respondiam adequadamente e havia falhas no layout geral. Estes erros foram resolvidos sistematicamente, começando pelas configurações do ambiente, seguindo para os problemas técnicos e finalizando com as correções na interface, estabelecendo assim uma base sólida para as melhorias subsequentes.

# 4. Relatorio Sobre Correçao De Bugs 

  ##Relatório de Correção de Bugs
1. Duplicação de Tarefas
Erro: Ao clicar no botão "Salvar", a tarefa estava sendo adicionada duas vezes.
Causa: Método addTask() no arquivo new-task.component.ts continha a chamada this.todoService.addTodo(newTodo) duplicada.
Solução: Removida a chamada duplicada do método.

Arquivo: [src/app/new-task/new-task.component.ts]

2. Barra de Rolagem Inoperante
 Erro: Lista de tarefas não exibia barra de rolagem quando necessário.
Causa: Propriedade overflow-y definida como hidden no CSS.
Solução: Alterada a propriedade para auto na classe .todo-list_container.

Arquivo: [src/app/todo/todo.component.css] 

3. Tarefas em Branco
Erro: Sistema permitia salvar tarefas sem título ou apenas com espaços.
Causa: Ausência de validação no método addTask().
Solução: Implementada validação com trim() e verificação de comprimento.

Arquivo: [src/app/new-task/new-task.component.ts]

4. Erro de Template
Erro: Erro de compilação no template do NewTaskComponent.
Causa: CSS misturado com HTML no arquivo de template.
Solução: Separado CSS para arquivo próprio e corrigido template.

Arquivo: [src/app/new-task/new-task.component.html]

5. Problemas de Ordenação
Erro: Botão de ordenação alfabética não funcionava corretamente.
Causa: Método de ordenação não considerava maiúsculas/minúsculas.
Solução: Implementada ordenação case-insensitive.

Arquivo: [src/app/todo/todo.component.ts]

6. Alertas Nativos
Erro: Alertas do navegador comprometiam a experiência do usuário.
Causa: Uso de alert() e confirm() nativos.
Solução: Implementado SweetAlert2 para alertas modernos.

Arquivo: [src/app/todo/todo.component.ts]

7. Dependências CommonJS
Erro: Avisos de otimização relacionados a dependências CommonJS.
Causa: Bibliotecas como canvg e jspdf usando CommonJS.
Solução: Adicionada configuração allowedCommonJsDependencies no angular.json.

Arquivo: [angular.json]

8. Filtro de Palavras
Erro: Sistema não filtrava palavras impróprias em português.
Causa: Ausência de implementação do filtro.
Solução: Criado ProfanityFilterService com lista extensa de palavras.

Arquivo: [src/app/services/profanity-filter.service.ts]

9. Exportação PDF
Erro: Funcionalidade de exportação para PDF não implementada.
Causa: Ausência da biblioteca jsPDF.
Solução: Instalada e implementada biblioteca jsPDF.

Arquivo: [src/app/todo/todo.component.ts]

10. Múltiplas Tarefas
Erro: Sistema não permitia adicionar múltiplas tarefas simultaneamente.
Causa: Implementação limitada ao método addTask().
Solução: Modificado componente para suportar múltiplas entradas.

Arquivo: [src/app/new-task/new-task.component.ts]

*- Cada correção foi testada e validada para garantir o funcionamento adequado da aplicação.*

## 5. Requisitos Técnicos (Lista de Tarefas do QA)

*A seguir estão os pontos exatos que você deve abordar.*

#5.1 Melhorias Implementadas:

1. - Sistema de Ordenação

Melhoria: Implementação de ordenação alfabética de tarefas.
Implementação: Adicionado botão de ordenação no componente principal.

Benefício: Melhor organização e visualização das tarefas.

Arquivo: [src/app/todo/todo.component.ts]


2. - Filtro de Palavras Impróprias

Melhoria: Sistema de filtro de palavras impróprias em português.
Implementação: Criado ProfanityFilterService com lista extensa de palavras.

Benefício: Conteúdo mais apropriado e profissional.

Arquivo: [src/app/services/profanity-filter.service.ts]



3. - Exportação para PDF
Melhoria: Funcionalidade de exportar lista de tarefas para PDF.
Implementação: Integração com biblioteca jsPDF.

Benefício: Facilidade para compartilhar e imprimir tarefas.

Arquivo: [src/app/todo/todo.component.ts]



4. - Alertas Modernos

Melhoria: Substituição dos alertas nativos por SweetAlert2.
Implementação: Integração da biblioteca SweetAlert2.

Benefício: Interface mais moderna e agradável.

Arquivo: [src/app/todo/todo.component.ts]



5. - Múltiplas Tarefas
    
Melhoria: Suporte para adicionar múltiplas tarefas simultaneamente.
Implementação: Modificação do NewTaskComponent.

Benefício: Maior produtividade na adição de tarefas.

Arquivo: [src/app/new-task/new-task.component.ts]



6. - Validações Aprimoradas
    
Melhoria: Sistema de validação mais robusto.
Implementação: Adicionadas validações para campos vazios e espaços.

Benefício: Dados mais consistentes e confiáveis.

Arquivo: [src/app/new-task/new-task.component.ts]


7. - Interface Responsiva
   
Melhoria: Melhor adaptação a diferentes tamanhos de tela.
Implementação: Ajustes no CSS e layout.

Benefício: Melhor experiência em dispositivos móveis.

Arquivo: [src/app/todo/todo.component.css]


8. - Atalhos de Teclado
    
Melhoria: Implementação de atalhos via tecla Enter.
Implementação: Adicionados event listeners para teclas.

Benefício: Navegação mais rápida e eficiente.

Arquivo: [src/app/new-task/new-task.component.ts]


9. - Persistência de Dados
    
Melhoria: Sistema de armazenamento local aprimorado.
Implementação: Otimização do uso do LocalStorage.
Benefício: Melhor performance e confiabilidade.
Arquivo: [src/app/services/todo.service.ts]


10. - Feedback Visual
    
Melhoria: Melhor feedback visual para ações do usuário.
Implementação: Adicionados indicadores visuais de sucesso/erro.

Benefício: [Maior clareza nas interações.]

Arquivo: src/app/todo/todo.component.css


*- Todas as melhorias foram implementadas seguindo as melhores práticas de desenvolvimento Angular e foram testadas para garantir seu funcionamento adequado.*



## 6. Instruções de Entrega

Todas as correções de bugs e melhorias planejadas foram implementadas com sucesso dentro do prazo estabelecido. Não houve itens pendentes ou dificuldades técnicas que tenham impedido a entrega completa das funcionalidades previstas.

## 7. CONSIDERAÇOES FINAIS

O projeto demonstrou a importância de uma abordagem sistemática na correção e melhoria de aplicações existentes. A combinação de correções de bugs, implementação de novas funcionalidades e modernização da interface resultou em uma aplicação que atende efetivamente às necessidades dos usuários.

A aplicação agora está pronta para uso, com uma base sólida para futuras melhorias e expansões. O código está mais limpo, mais manutenível e seguindo as melhores práticas de desenvolvimento Angular.
