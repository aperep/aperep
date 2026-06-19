# a.perep.ru

Личный сайт Александра Перепечко. Собран на [Hugo](https://gohugo.io)
с темой [coder](https://github.com/luizdepra/hugo-coder).

## Требования

- **Hugo extended**, версия ≥ `0.163.3` (зафиксирована в [`.tool-versions`](.tool-versions)).
- Тема `coder` подключена как git-подмодуль.

## Сборка и запуск

```bash
# при клонировании сразу с подмодулями
git clone --recurse-submodules <repo-url>

# или, если репозиторий уже склонирован
git submodule update --init themes/coder

hugo server -D     # локальный сервер с черновиками: http://localhost:1313
hugo               # production-сборка в ./public
```

## Структура

| Путь | Что внутри |
|------|------------|
| `content/` | страницы и заметки (`me`, `teach`, `mipt`, `nb`, …) |
| `layouts/` | переопределения шаблонов темы и шорткоды |
| `static/`  | файлы «как есть» (`CV.pdf`, картинки, граф тем) |
| `hugo.yaml` | конфигурация сайта |
| `ROADMAP.md` | план развития |

## Добавить страницу

Создайте `.md`-файл в `content/` с front matter в формате TOML (`+++ … +++`).
Формулы (`$…$` и `$$…$$`) рендерит KaTeX — она включается параметром `math: true`
в `hugo.yaml` или в front matter конкретной страницы.

## План развития

См. [ROADMAP.md](ROADMAP.md).
