# Manual Operacional para Voluntários — Volunters Event

**Versão:** 1.0  
**Data:** 7 de dezembro de 2025

**Contato de coordenação:** {{coord_name}} — {{coord_phone}} — {{coord_email}}

---

## 1. Objetivo

- **Descrição:** Este manual descreve as responsabilidades, procedimentos operacionais, segurança e comunicação que voluntários devem seguir durante eventos organizados pela Volunters.  
- **Público-alvo:** Voluntários, Capitães de Equipe, Coordenadores.

## 2. Estrutura de cargos e responsabilidades

- **Voluntário:** cumprir escala, comunicar ausência, seguir orientações do capitão, registrar presença.  
- **Capitão de equipe:** organizar membros, delegar tarefas, checar equipamentos, reportar ao coordenador.  
- **Coordenador do evento:** tomada de decisões, comunicação com organização, lidar com incidentes e emergências.

## 3. Antes do evento (preparação)

- **Confirmação de presença:** confirmar no sistema até X dias/horas antes.  
- **Documentação:** RG/CPF (se aplicável), termo de responsabilidade assinado (digital ou físico).  
- **Uniforme e identificação:** usar camiseta/credencial fornecida; credencial visível o tempo todo.  
- **Treinamento pré-evento:** participar do briefing obrigatório (data/hora/local ou remoto).  
- **Checagem de equipamentos:** verificar lanternas, rádios, coletes, kits de primeiros socorros da equipe.

## 4. Chegada e check-in

- **Horário de chegada:** chegar com pelo menos 30 minutos de antecedência ao início do turno.  
- **Local de check-in:** `{{local_checkin}}` — apresentar documento e credencial.  
- **Registro de ponto:** registrar entrada/saída no sistema (app/planilha).  
- **Briefing de início:** ouvir instruções do capitão e confirmar tarefas atribuídas.

## 5. Operação durante o turno

- **Pontos principais de atuação:** recepção, orientação, controle de acesso, montagem, apoio logístico, triagem.  
- **Comunicação:** use o canal oficial (rádio/app) com linguagem clara. Em caso de dúvida, contate o capitão.  
- **Relatórios de ocorrências:** registrar qualquer incidente (lesão, perda, conflito) no formulário de ocorrência e avisar imediatamente o capitão.  
- **Pausas:** seguir escala definida pelo capitão; não abandonar posto sem substituto.

## 6. Gestão de público e comportamento

- **Atendimento:** ser cordial, claro, e neutro. Direcionar o público para informações oficiais.  
- **Conflitos:** não intervir fisicamente; acionar capitão/coordenador de segurança.  
- **Fumo/Álcool:** proibido durante o turno enquanto em serviço, salvo áreas designadas e fora do expediente.  
- **Fotografia e privacidade:** respeitar a privacidade; fotos só com autorização.

## 7. Segurança e primeiros socorros

- **Local dos kits de primeiro socorro:** `{{local_kit_primeiros_socorros}}`  
- **Procedimento para feridos leves:** aplicar primeiros socorros básicos e acionar capitão; registrar ocorrência.  
- **Incidentes graves:** ligar para emergência (ex: `190` / `192`), isolar área, avisar coordenador.  
- **Evacuação:** seguir rota de evacuação definida e ajudar a guiar público conforme instruções do coordenador de segurança.

## 8. Gestão de pertences e achados

- **Achados:** entregar objetos ao posto de achados e registrar descrição, local e horário.  
- **Pertences pessoais:** manter sob responsabilidade; organização não se responsabiliza por objetos perdidos.

## 9. Handover (passagem de turno)

- **Checklist de entrega:** status das tarefas, ocorrência(s), equipamentos emprestados, contatos importantes.  
- **Assinatura de entrega:** capitão e voluntário que encerra devem confirmar no registro.

## 10. Acessos e permissões no sistema

- **Login:** usar credenciais pessoais; não compartilhar senhas.  
- **Relatórios:** capitães enviam resumos diários via sistema `{{app_url}}` > Equipe > Relatórios.  
- **Dados sensíveis:** tratar informações pessoais com confidencialidade.

## 11. Conduta e disciplina

- **Código de conduta:** respeito, pontualidade, cumprimento de tarefas.  
- **Sanções:** advertência, suspensão do turno, exclusão de futuras atividades em caso de infração grave.  
- **Denúncias:** enviar ao coordenador via `{{report_form_link}}` ou `{{coord_email}}`.

## 12. FAQs rápidas

- **Como aviso uma ausência de última hora?** — Use o app ou ligue para o capitão com o máximo de antecedência.  
- **Posso trocar de turno com alguém?** — Só com aprovação do capitão e registro no sistema.  
- **Onde almoço?** — Área de alimentação designada `{{area_alimentacao}}`.

## 13. Checklists úteis (anexos)

- **Checklist do voluntário (pré-turno):**
  - [ ] Confirmação de presença no sistema  
  - [ ] Término do briefing  
  - [ ] Uniforme e credencial  
  - [ ] Itens pessoais (água, protetor solar, medicação)
- **Checklist do capitão (início de turno):**
  - [ ] Conferir lista de voluntários presentes  
  - [ ] Validar equipamentos  
  - [ ] Confirmar canais de comunicação  
  - [ ] Receber relatório do turno anterior

## 14. Anexos e formulários

- Formulário de ocorrência: `{{incident_form_link}}`  
- Termo de responsabilidade: `{{waiver_link}}`  
- Mapa do local e rotas de evacuação: `{{map_link}}`

## 15. Contatos de emergência e suporte

- **Coordenador do Evento:** {{coord_name}} — `{{coord_phone}}` — `{{coord_email}}`  
- **Segurança Local:** `{{security_phone}}`  
- **Emergência Médica:** `192` (ou número local)  
- **Suporte técnico do app:** `{{support_email}}`

---

## Sugestões de personalização e envio

- Gerar uma versão por role (Voluntário geral, Capitão, Coordenador) ocultando seções não aplicáveis.  
- Salvar como `docs/Operational_Manual_Volunteers.md` e gerar PDF via `puppeteer` / `markdown-pdf`.  
- No perfil do usuário, exibir um botão `Manual Operacional` que baixa a versão PDF personalizada com nome, turnos e contatos locais.  
- Para envio por email: anexar PDF ou enviar link público privado (Supabase Storage).

---

## Próximos passos possíveis

1. Criar este arquivo no repositório (feito).  
2. Gerar exemplos de PDFs para 1 ou mais usuários (é preciso fornecer `name`, `role`, `email`, `coord_name/phone/email`).  
3. Implementar scripts de geração e envio (ex.: `scripts/generate_manual.js`, `scripts/send_manual.js`).

Se quiser que eu execute o passo 2 ou 3, informe qual opção prefere.
